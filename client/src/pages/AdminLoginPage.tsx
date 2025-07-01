import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [adminNumber, setAdminNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcoded credentials (replace with backend login in future)
    if (adminNumber === '254254' && password === 'Taji') {
      localStorage.setItem('tajiAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-red-800">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && (
          <p className="text-red-700 mb-4 text-center font-medium">{error}</p>
        )}

        <input
          type="text"
          placeholder="Admin Number"
          value={adminNumber}
          onChange={(e) => setAdminNumber(e.target.value)}
          className="w-full mb-4 p-3 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
