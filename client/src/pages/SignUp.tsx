import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setMsg('⚠️ All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setMsg('❌ Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      setMsg('');
      // Replace with your backend endpoint
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, { name, email, password });
      setMsg('✅ Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err: any) {
      setMsg('❌ Registration failed or email already in use');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Sign Up for Mediquick</h2>
        {msg && <p className="text-center mb-3 text-sm text-red-600">{msg}</p>}
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
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
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${loading ? 'bg-blue-300 cursor-wait' : 'bg-blue-700 hover:bg-blue-900'}`}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="flex justify-end mt-4 text-sm">
          <Link to="/login" className="text-blue-700 hover:underline">Already have an account? Login</Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
