import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentDetailsPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const [mpesaCode, setMpesaCode] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('tajiUser') || 'null');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = () => {
    if (!mpesaCode.trim()) {
      return alert('Please enter your M-Pesa Transaction Code.');
    }

    const message = `NEW ONLINE ORDER\n\nCustomer: ${user?.name}\nPhone: ${user?.phoneNumber}\nEmail: ${user?.email}\n\nOrder Details:\n${cart
      .map((item) => `- ${item.name} x ${item.qty} @ Ksh ${item.price}`)
      .join('\n')}\n\nTotal: Ksh ${total}\n\nM-Pesa Code: ${mpesaCode}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/254718601536?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
    alert('Order submitted! Please wait for a call within 5 minutes.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white text-red-900 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Payment Details</h1>

        <div className="bg-red-100 p-4 rounded mb-6 text-center">
          <p className="text-lg font-semibold">Buy Goods Till Number</p>
          <p className="text-2xl font-bold text-red-800">4455627</p>
          <p className="text-sm text-gray-700">Taji Food Store</p>
        </div>

        <input
          type="text"
          placeholder="Enter M-Pesa Transaction Code"
          value={mpesaCode}
          onChange={(e) => setMpesaCode(e.target.value)}
          className="w-full mb-4 p-3 border border-red-300 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-red-800 text-white py-3 rounded hover:bg-red-700 transition"
        >
          Submit Order and Wait for Call
        </button>
      </div>
    </div>
  );
}
