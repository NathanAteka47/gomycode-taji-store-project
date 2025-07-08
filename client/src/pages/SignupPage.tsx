import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';;

export default function SignupPage() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');
  const navigate = useNavigate();
  
  const checkStrength = (pwd: string) => {
    if (pwd.length < 6) return setStrength('Weak');
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      setStrength('Strong');
    } else {
      setStrength('Moderate');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('❌ Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(`${VITE_API_BASE_URL}/api/users/register`, {
        name,
        phoneNumber,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem('tajiUserToken', token);
      localStorage.setItem('tajiUser', JSON.stringify(user));

      alert('🎉 Account created and logged in!');
      navigate('/'); // ✅ Redirect directly to home/dashboard
    } catch (err: unknown) {
      const message = (err as Error).message || 'Signup failed.';
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-800 to-red-600">
      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full"
      >
        <h2 className="text-3xl font-extrabold text-center text-red-800 mb-6">
          Create Your Taji Account
        </h2>

        {/* Name */}
        <div className="relative mb-5">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
            className="peer w-full border-b-2 border-red-400 py-2 focus:outline-none placeholder-transparent"
          />
          <label
            htmlFor="name"
            className="absolute top-0 left-0 text-sm text-gray-600 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-red-700"
          >
            Full Name
          </label>
        </div>

        {/* Phone */}
        <div className="relative mb-5">
          <input
            type="text"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="Phone Number"
            className="peer w-full border-b-2 border-red-400 py-2 focus:outline-none placeholder-transparent"
          />
          <label
            htmlFor="phone"
            className="absolute top-0 left-0 text-sm text-gray-600 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-red-700"
          >
            Phone Number
          </label>
        </div>

        {/* Password */}
        <div className="relative mb-5">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkStrength(e.target.value);
            }}
            required
            placeholder="Password"
            className="peer w-full border-b-2 border-red-400 py-2 focus:outline-none placeholder-transparent"
          />
          <label
            htmlFor="password"
            className="absolute top-0 left-0 text-sm text-gray-600 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-red-700"
          >
            Password
          </label>
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2.5 text-gray-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {password && (
            <div className="mt-1 text-sm">
              <span
                className={`${
                  strength === 'Strong'
                    ? 'text-green-600'
                    : strength === 'Moderate'
                    ? 'text-orange-500'
                    : 'text-red-500'
                }`}
              >
                Password Strength: {strength}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            className="peer w-full border-b-2 border-red-400 py-2 focus:outline-none placeholder-transparent"
          />
          <label
            htmlFor="confirm"
            className="absolute top-0 left-0 text-sm text-gray-600 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-red-700"
          >
            Confirm Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition font-semibold"
        >
          Create Account
        </button>
        <p className="text-sm mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-red-600 underline">
            Login
          </a>
        </p>
      </motion.form>
    </div>
  );
}
