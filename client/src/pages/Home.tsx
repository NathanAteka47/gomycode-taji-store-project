import { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Homes from './Homes';
import Faqs from './Faqs';

const HomePage = () => {
  const [location, setLocation] = useState("Nairobi");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-white">
        <img src="/img1.png" alt="Medical Stay" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <img src="/logo.png" alt="Mediquick Logo" className="mx-auto mb-6 w-20 h-20 rounded-full shadow-lg bg-white/80 p-2" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Find Healing, Comfort & Care</h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto font-medium text-white drop-shadow">Doctor-owned recovery homes providing peace of mind, dignity, and healing environments tailored to your medical needs.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/homes" className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-8 rounded-full text-lg shadow transition">Browse Medical Stays</Link>
            <Link to="/book" className="bg-white text-blue-800 font-semibold py-3 px-8 rounded-full text-lg shadow hover:bg-blue-100 transition">Book Now</Link>
          </div>
        </div>
      </section>

      {/* Search Form Section */}
      <section className="bg-white py-8 shadow-inner">
        <div className="max-w-4xl mx-auto rounded-xl bg-blue-50/80 p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-xs text-blue-700 font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Nairobi, Kisumu..."
              className="bg-white border border-blue-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-xs text-blue-700 font-medium">Check-in</label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              placeholderText="Select date"
              className="bg-white border border-blue-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              dateFormat="dd MMM yyyy"
              minDate={new Date()}
            />
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-xs text-blue-700 font-medium">Check-out</label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              placeholderText="Select date"
              className="bg-white border border-blue-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              dateFormat="dd MMM yyyy"
              minDate={checkIn || new Date()}
            />
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-xs text-blue-700 font-medium">Patients</label>
            <select
              value={guests}
              onChange={(e) => setGuests(+e.target.value)}
              className="bg-white border border-blue-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {[...Array(6)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1} Patient(s)</option>
              ))}
            </select>
          </div>
          <button className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-full transition mt-4 md:mt-0 w-full md:w-auto">🔎 Search</button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-white px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Why Choose Mediquick Stays?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience compassionate care designed by medical professionals in comfortable, home-like settings.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: "🩺",
              title: "24/7 Care Support",
              text: "Round-the-clock monitoring, nurses on call, and on-demand assistance tailored to medical needs."
            },
            {
              icon: "👨‍⚕️",
              title: "Doctor Supervised",
              text: "Every home is professionally overseen by licensed doctors, ensuring safety and quality care."
            },
            {
              icon: "🏡",
              title: "Comfort Meets Care",
              text: "A warm, peaceful environment equipped with medical-grade beds and private recovery amenities."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-md border border-blue-100 shadow-xl rounded-2xl p-8 hover:scale-105 transition">
              <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full text-3xl shadow-inner">
                {item.icon}
              </div>
              <h4 className="text-xl font-semibold mb-3 text-blue-900">{item.title}</h4>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Homes Section */}
      <Homes />

      {/* Services */}
      <section className="py-20 bg-white text-center px-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-8">Our Most Booked Services</h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: "👩‍⚕️", name: "BNB (Medical Bed & Breakfast)" },
            { icon: "🧓", name: "Elderly Care" },
            { icon: "🛌", name: "Post-Surgery Recovery" },
            { icon: "🏃‍♀️", name: "Physiotherapy Stays" },
          ].map((s, i) => (
            <div key={i} className="border p-6 rounded-xl hover:bg-blue-50 transition">
              <div className="text-4xl mb-2">{s.icon}</div>
              <h4 className="font-semibold">{s.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Patients Say</h2>
        <div className="max-w-4xl mx-auto">
          <blockquote className="italic text-lg">
            “I couldn’t have recovered better anywhere else. The environment was clean, the care was constant, and I felt like family.”
          </blockquote>
          <p className="mt-4 font-semibold">— Jane, Post-Surgery Patient</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-100 py-16 text-center px-6">
        <h3 className="text-2xl font-bold mb-4 text-blue-800">Book a Safe, Doctor-Led Stay Now</h3>
        <Link to="/book" className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-900">Get Started</Link>
      </section>

      {/* FAQs Section */}
      <Faqs />
    </>
  );
};

export default HomePage;
