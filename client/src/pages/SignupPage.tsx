import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post('/api/users/register', { name, phoneNumber, password });
      alert('Account created successfully! Please log in.');
      navigate('/login');
    } catch (err) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="bg-white text-red-800 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border border-red-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full mb-4 p-3 border border-red-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border border-red-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-6 p-3 border border-red-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
