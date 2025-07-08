import { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
    email: '',
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('tajiUser') || 'null');
    if (!user) navigate('/login');
    else setForm(prev => ({ ...prev, phone: user.phoneNumber, email: user.email }));
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('tajiCheckoutForm', JSON.stringify(form));
    navigate('/payment-details');
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-red-100 to-white text-red-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-extrabold mb-8 text-center text-red-800 tracking-wide">Secure Checkout</h1>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 shadow-lg rounded-lg bg-white p-6">
        <div>
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Shipping Details</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border border-red-300 rounded focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border border-red-300 rounded focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border border-red-300 rounded focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="city"
            placeholder="City / Town"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border border-red-300 rounded focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border border-red-300 rounded focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Order Summary</h2>
          <div className="border p-6 rounded bg-gray-50 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                </div>
                <p className="font-bold text-red-700">Ksh {(item.price * item.qty).toLocaleString()}</p>
              </div>
            ))}
            <hr />
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span className="text-red-800">Ksh {total.toLocaleString()}</span>
            </div>
            <button
              type="submit"
              className="w-full bg-red-800 text-white py-3 mt-6 rounded hover:bg-red-700 text-lg font-semibold shadow-md transition"
            >
              🚀 Confirm & Proceed to Payment
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
