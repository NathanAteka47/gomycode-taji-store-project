import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
  const user = JSON.parse(localStorage.getItem('tajiUser') || 'null');
  const token = localStorage.getItem('tajiUserToken') || '';


    await axios.post(
      'http://localhost:5001/api/orders',
      {
        user: user._id,
        orderItems: cart,
        shippingInfo: form,
        totalPrice: total,
        sendEmail: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert('Order placed successfully!');
    dispatch(clearCart());
    navigate('/');
  } catch (err: any) {
    console.error('Checkout error:', err.response?.data || err.message);
    alert('Checkout failed: ' + (err.response?.data?.message || 'Unknown error'));
  }
};

  return (
    <div className="min-h-screen bg-white text-red-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <form   onSubmit={(e) => {
    e.preventDefault();
    localStorage.setItem('tajiCheckoutForm', JSON.stringify(form));
    navigate('/payment-details');
  }} className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border border-red-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border border-red-300 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border border-red-300 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City / Town"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border border-red-300 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border border-red-300 rounded"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="border p-4 rounded space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm">Qty: {item.qty}</p>
                </div>
                <p>Ksh {(item.price * item.qty).toLocaleString()}</p>
              </div>
            ))}
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Ksh {total.toLocaleString()}</span>
            </div>
            <button
              type="submit"
              className="w-full bg-red-800 text-white py-2 mt-4 rounded hover:bg-red-700 transition"
            >
              Confirm & Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
