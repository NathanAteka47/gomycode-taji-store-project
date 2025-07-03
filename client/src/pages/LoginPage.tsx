import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/users/login', {
        phoneNumber,
        password,
      });

      const { token, ...userData } = res.data;
      localStorage.setItem('tajiUserToken', token);
      localStorage.setItem('tajiUser', JSON.stringify(userData));

      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="bg-white text-red-800 min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Customer Login</h2>
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
          className="w-full mb-6 p-3 border border-red-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Login
        </button>
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{' '}
          <a href="/signup" className="text-red-600 underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
