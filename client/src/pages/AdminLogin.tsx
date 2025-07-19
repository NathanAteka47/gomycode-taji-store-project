import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMsg('⚠️ Email and password are required');
      return;
    }

    try {
      setLoading(true);
      setMsg('');
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setMsg('✅ Logged in. Redirecting...');
      setTimeout(() => navigate('/admin'), 1000);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setMsg('❌ Invalid credentials');
      } else {
        setMsg('❌ Something went wrong. Try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-800">Admin Login</h2>

        {msg && <p className="text-center mb-3 text-sm text-red-600">{msg}</p>}

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="input input-bordered w-full mb-3"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="input input-bordered w-full mb-4"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${loading ? 'bg-blue-300 cursor-wait' : 'bg-blue-700 hover:bg-blue-900'}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
