import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHomeStore } from '../stores/useHomeStore';

const Book = () => {
  const { homes, loading, error, fetchHomes } = useHomeStore();
  const [selectedHome, setSelectedHome] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    name: '',
    email: '',
    phone: '',
    condition: '',
    notes: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHomes();
  }, [fetchHomes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHome || !selectedPackage) {
      setMessage('Please select a home and package.');
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/bookings`,
        {
          home: selectedHome,
          packageType: selectedPackage,
          ...formData,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('✅ Booking submitted successfully!');
      setFormData({
        checkIn: '',
        checkOut: '',
        name: '',
        email: '',
        phone: '',
        condition: '',
        notes: '',
      });
      setSelectedHome('');
      setSelectedPackage('');
    } catch (error) {
      setMessage('❌ Failed to submit booking. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-white text-gray-800 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">Book a Stay</h2>
      {message && <p className="mb-6 text-center font-medium text-sm text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Select Home</label>
          <select
            name="home"
            value={selectedHome}
            onChange={e => setSelectedHome(e.target.value)}
            className="input input-bordered w-full"
            required
          >
            <option value="">Choose a home</option>
            {homes.map(home => (
              <option key={home._id} value={home._id}>{home.name}</option>
            ))}
          </select>
        </div>
        {selectedHome && (
          <div>
            <label className="block text-sm font-medium">Select Package</label>
            <select
              name="packageType"
              value={selectedPackage}
              onChange={e => setSelectedPackage(e.target.value)}
              className="input input-bordered w-full"
              required
            >
              <option value="">Choose a package</option>
              {homes.find(h => h._id === selectedHome)?.packages.map((pkg: any) => (
                <option key={pkg.type} value={pkg.type}>{pkg.type} - KES {pkg.price.toLocaleString()}</option>
              ))}
            </select>
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Check-in Date</label>
            <input
              className="input input-bordered w-full"
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Check-out Date</label>
            <input
              className="input input-bordered w-full"
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            placeholder="Medical Condition"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Additional Notes (optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Any special requests or notes..."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white text-lg font-semibold ${loading ? 'bg-blue-300 cursor-wait' : 'bg-blue-700 hover:bg-blue-900'}`}
        >
          {loading ? 'Booking...' : 'Book Now'}
        </button>
      </form>
    </section>
  );
};

export default Book;
