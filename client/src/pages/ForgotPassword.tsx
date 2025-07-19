import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMsg('⚠️ Please enter your email');
      return;
    }
    try {
      setLoading(true);
      setMsg('');
      // Replace with your backend endpoint
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, { email });
      setMsg('✅ If this email is registered, a reset link has been sent.');
    } catch (err: any) {
      setMsg('❌ Failed to send reset email. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Forgot Password</h2>
        {msg && <p className="text-center mb-3 text-sm text-green-600">{msg}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered w-full"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${loading ? 'bg-blue-300 cursor-wait' : 'bg-blue-700 hover:bg-blue-900'}`}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="flex justify-end mt-4 text-sm">
          <Link to="/login" className="text-blue-700 hover:underline">Back to Login</Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword; 