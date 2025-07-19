
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import { OptimizedImage } from '../components/OptimizedImage';

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
></motion.div>
export default function HomePage() {
  return (
    <div className="bg-white text-[#8B0000] min-h-screen">
      <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
{/* Hero Section */}

<HeroSection />


</motion.div>
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
{/* Blog / Offers Section */}
<section id="blogs" className="py-20 bg-gradient-to-b from-red-50 to-white">
  <div className="text-center max-w-4xl mx-auto mb-12">
    <h2 className="text-4xl font-bold text-red-900 mb-2 tracking-tight animate-fadeIn">🔥 Latest Offers & Events</h2>
    <p className="text-gray-600 text-lg animate-fadeIn delay-100">Fresh deals, tasty vibes, and unforgettable moments</p>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 animate-fadeInUp">
    {[
      { src: '/grand-opening.jpg', alt: 'Grand Opening' },
      { src: '/july.png', alt: 'July Promo' },
      { src: '/Fishy-goodness.png', alt: 'Fishy Goodness' },
      { src: '/vibes.png', alt: 'Vibes Only' },
      { src: '/juice.jpg', alt: 'Fresh Juices' },
      { src: '/vegie.png', alt: 'Vegie Days' },
      { src: '/delivery.jpg', alt: 'Fast Delivery' },
      { src: '/call.jpg', alt: 'Call to Order' },
    ].map((img, i) => (
      <div key={i} className="relative group overflow-hidden rounded-xl shadow-lg hover:scale-105 transition transform duration-500">
        <OptimizedImage src={img.src} alt={img.alt} className="w-full h-48 object-cover rounded-xl shadow" fallbackSrc="/images/placeholder.jpg" loading="lazy" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <p className="text-white text-lg font-semibold">{img.alt}</p>
        </div>
      </div>
    ))}
  </div>
</section>

</motion.div>
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
      {/* Reservation & Reviews Section */}
<section id="reservations" className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
  <div className="max-w-5xl mx-auto text-center mb-12">
    <h2 className="text-4xl font-extrabold text-red-900 mb-2 tracking-tight">Book a Table & Share Your Experience</h2>
    <p className="text-gray-600 text-lg">Reserve in seconds and let others know how Taji made your day!</p>
  </div>

  <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
    {/* Reservation Form */}
    <form className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 animate-fadeIn">
      <h3 className="text-xl font-bold text-red-800 mb-4">Make a Reservation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Full Name" className="p-3 border border-gray-300 rounded-lg" />
        <input type="email" placeholder="Email Address" className="p-3 border border-gray-300 rounded-lg" />
        <input type="tel" placeholder="Phone Number" className="p-3 border border-gray-300 rounded-lg" />
        <input type="date" className="p-3 border border-gray-300 rounded-lg" />
      </div>
      <textarea
        placeholder="Special requests or messages..."
        className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
        rows={3}
      />
      <button className="w-full mt-6 bg-red-800 text-white py-3 rounded-lg hover:bg-red-700 transition">
        Reserve Now
      </button>
    </form>

    {/* Review Form */}
    <form className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 animate-fadeIn delay-100">
      <h3 className="text-xl font-bold text-red-800 mb-4">Leave a Review</h3>
      <input type="text" placeholder="Your Name" className="w-full mb-4 p-3 border border-gray-300 rounded-lg" />
      <textarea
        placeholder="Your feedback..."
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
        rows={4}
      />
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Rating</label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 text-xl hover:scale-125 transition transform cursor-pointer">⭐</span>
          ))}
        </div>
      </div>
      <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-600 transition">
        Submit Review
      </button>
    </form>
  </div>
</section>

      </motion.div>
    </div>
  );
}
