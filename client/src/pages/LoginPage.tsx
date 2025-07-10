import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { VITE_API_BASE_URL } from "../constants/URLs";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${VITE_API_BASE_URL}/api/users/login`, {
        phoneNumber,
        password,
      });

      const { token, user } = res.data; // ✅ Ensure your backend returns { token, user }
      localStorage.setItem("tajiUserToken", token);
      localStorage.setItem("tajiUser", JSON.stringify(user));

      alert("Login successful!");
      navigate("/");
      window.location.reload(); // Refresh the page after navigating home
    } catch (err: unknown) {
      console.error("Login error:", (err as Error).message);
      alert("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-800 to-red-600">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full"
      >
        <h2 className="text-3xl font-extrabold text-center text-red-800 mb-6">
          Welcome Back to Taji
        </h2>

        {/* Phone Input */}
        <div className="relative mb-6">
          <input
            type="text"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            autoComplete="username"
            className="peer w-full border-b-2 border-red-400 focus:outline-none focus:border-red-700 py-2 placeholder-transparent"
            placeholder="Phone Number"
          />
          <label
            htmlFor="phone"
            className="absolute left-0 top-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-red-700"
          >
            Phone Number
          </label>
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <input
            type={visible ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="peer w-full border-b-2 border-red-400 focus:outline-none focus:border-red-700 py-2 placeholder-transparent"
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className="absolute left-0 top-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-red-700"
          >
            Password
          </label>
          <span
            onClick={() => setVisible(!visible)}
            className="absolute right-2 top-2.5 text-gray-500 cursor-pointer"
          >
            {visible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-red-800 text-white rounded hover:bg-red-700 transition font-semibold"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="text-sm mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-600 font-medium underline">
            Sign Up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
