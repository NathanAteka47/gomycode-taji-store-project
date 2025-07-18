import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const checkStrength = (pwd: string) => {
    if (pwd.length < 6) return setStrength('Weak');
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      setStrength('Strong');
    } else {
      setStrength('Moderate');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${VITE_API_BASE_URL}/api/users/register`, {
        name,
        phoneNumber,
        password,
      });
      if (response.data?.token) {
        setMessage('✅ Signup successful! Redirecting...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage('❌ Signup failed. Please try again.');
      }
    } catch (err: any) {
      setMessage('❌ Signup failed. Phone number may already be registered.');
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
        aria-label="Signup Form"
      >
        <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">Sign Up</h2>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border-b-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 py-2 mb-4"
        />
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
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            checkStrength(e.target.value);
          }}
          required
          className="w-full border-b-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 py-2 mb-4"
        />
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border-b-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 py-2 mb-6"
        />
        <button
          type="submit"
          className="w-full py-2 bg-red-700 text-white rounded hover:bg-red-600 transition"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
        <p className="text-sm mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-red-600 underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
