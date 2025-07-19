import { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    condition: '',
    roomType: '',
    checkIn: '',
    checkOut: '',
    notes: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/bookings`, formData);
      setMessage('✅ Booking submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        condition: '',
        roomType: '',
        checkIn: '',
        checkOut: '',
        notes: '',
      });
      setStep(1);
    } catch (err) {
      setMessage('❌ Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Book a Stay</h2>

      {message && (
        <div
          className={`mb-4 text-sm text-center font-medium ${
            message.includes('✅') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email Address"
            type="email"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            placeholder="Phone Number"
            type="tel"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            onClick={() => setStep(2)}
            disabled={!formData.name || !formData.email || !formData.phone}
            className="w-full bg-blue-700 hover:bg-blue-900 text-white py-3 rounded font-semibold transition"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-fade-in">
          <input
            name="condition"
            onChange={handleChange}
            value={formData.condition}
            placeholder="Medical Condition"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            name="roomType"
            onChange={handleChange}
            value={formData.roomType}
            className="w-full border border-gray-300 rounded px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Room Type</option>
            <option value="Standard">Standard Room</option>
            <option value="Deluxe">Deluxe Room</option>
            <option value="Private BnB">Private BnB</option>
          </select>

          <input
            type="date"
            name="checkIn"
            onChange={handleChange}
            value={formData.checkIn}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="date"
            name="checkOut"
            onChange={handleChange}
            value={formData.checkOut}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <textarea
            name="notes"
            onChange={handleChange}
            value={formData.notes}
            placeholder="Additional Notes (optional)"
            className="w-full border border-gray-300 rounded px-4 py-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="flex justify-between items-center">
            <button
              onClick={() => setStep(1)}
              className="text-blue-700 underline font-medium hover:text-blue-900"
            >
              ← Back
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading || !formData.checkIn || !formData.checkOut || !formData.roomType}
              className="bg-blue-700 hover:bg-blue-900 text-white px-6 py-2 rounded font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
