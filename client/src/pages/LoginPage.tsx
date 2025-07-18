import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { VITE_API_BASE_URL } from "../constants/URLs";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const response = await axios.post(`${VITE_API_BASE_URL}/api/users/login`, {
        phoneNumber,
        password,
      });
      if (response.data?.token) {
        setMessage('✅ Login successful! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage('❌ Login failed. Please try again.');
      }
    } catch (err: any) {
      setMessage('❌ Invalid phone number or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-200 to-red-100"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        aria-label="Login Form"
      >
        <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">Login</h2>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          id="phoneNumber"
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="w-full border-b-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 py-2 mb-4"
        />
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border-b-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 py-2 mb-6"
        />
        <button
          type="submit"
          className="w-full py-2 bg-red-700 text-white rounded hover:bg-red-600 transition"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
        <p className="text-sm mt-6 text-center text-gray-600">
          Forgot your password?{' '}
          <Link to="/forgot-password" className="text-red-600 underline font-medium">
            Reset Password
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
