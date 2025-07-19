import { useState, useEffect } from 'react'; 
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { OptimizedImage } from '../components/OptimizedImage';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export default function CheckoutPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('tajiUser') || 'null');
    if (!user) navigate('/login');
    else setForm(prev => ({
      ...prev,
      phone: user.phoneNumber || '',
      email: user.email || ''
    }));
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('tajiUser') || 'null');
      const orderPayload = {
        user: user?._id,
        orderItems: cart.map(item => ({
          name: item.name,
          qty: item.qty,
          price: item.price,
          product: item._id
        })),
        shippingInfo: {
          name: form.name,
          address: form.address,
          phone: form.phone,
          email: form.email
        },
        totalPrice: total
      };
      await axios.post(`${VITE_API_BASE_URL}/api/orders`, orderPayload);
      setMessage('✅ Order placed successfully! Redirecting to payment...');
      setTimeout(() => {
        // Optionally clear cart here if you want
        navigate('/payment-details');
      }, 1500);
    } catch (err) {
      setMessage('❌ Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-200 to-red-100"
      >
        <OptimizedImage src="/images/placeholder.jpg" alt="Empty cart" className="w-32 h-32 mb-4 opacity-60" />
        <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
      </motion.div>
    );
  }

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
        aria-label="Checkout Form"
      >
        <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">Checkout</h2>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 py-2 mb-4"
        />
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 py-2 mb-4"
        />
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          id="phone"
          name="phone"
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 py-2 mb-4"
        />
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 py-2 mb-6"
        />
        <button
          type="submit"
          className="w-full py-2 bg-red-700 text-white rounded hover:bg-red-600 transition"
          disabled={loading}
        >
          {loading ? 'Placing order...' : 'Place Order'}
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </motion.div>
  );
}
