import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    setStatus('✅ Message sent successfully!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="py-20 px-6 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-8">We’re here to support your healing journey. Reach out any time.</p>

        {status && (
          <div className="text-green-600 mb-4 text-sm">{status}</div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 text-left bg-white p-6 rounded-lg shadow-md">
          <input
            className="input input-bordered w-full"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="input input-bordered w-full"
            placeholder="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="input input-bordered w-full"
            placeholder="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            className="input input-bordered w-full h-32"
            placeholder="Your Message..."
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-900 transition"
          >
            📩 Send Message
          </button>
        </form>

        <div className="mt-10 text-sm text-gray-600 space-y-2">
          <p>📍 <strong>Nairobi, Kenya</strong></p>
          <p>📞 <a href="tel:+254718601536" className="text-blue-700 underline">+254 718 601 536</a></p>
          <p>💬 <a href="https://wa.me/254718601536" target="_blank" className="text-green-600 underline">Chat via WhatsApp</a></p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
