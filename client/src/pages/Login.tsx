import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg('⚠️ Email and password are required');
      return;
    }
    try {
      setLoading(true);
      setMsg('');
      // Replace with your backend endpoint
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setMsg('✅ Logged in. Redirecting...');
      setTimeout(() => navigate('/'), 1000);
    } catch (err: any) {
      setMsg('❌ Invalid credentials or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 flex items-center justify-center bg-gray-50 min-h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Login to Mediquick</h2>
        {msg && <p className="text-center mb-3 text-sm text-red-600">{msg}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${loading ? 'bg-blue-300 cursor-wait' : 'bg-blue-700 hover:bg-blue-900'}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/forgot-password" className="text-blue-700 hover:underline">Forgot Password?</Link>
          <Link to="/signup" className="text-blue-700 hover:underline">Sign Up</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
