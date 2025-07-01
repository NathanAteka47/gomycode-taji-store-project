import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="bg-white text-[#8B0000] min-h-screen">
      {/* Hero Section */}
      <header className="animate-fadeIn py-16 text-center bg-[#8B0000] text-white">
        <h1 className="animate-fadeIn text-5xl font-extrabold mb-4">Welcome to Taji Three In One Online Store</h1>
        <p className="animate-fadeIn text-lg">Order delicious food, refreshing water, and tasty cakes online</p>
        <Link to="/products">
          <button className="mt-6 px-6 py-3 bg-white text-[#8B0000] font-semibold rounded hover:bg-gray-200 transition">
            View Our Products
          </button>
        </Link>
      </header>

      {/* Blog / Offers Section */}
      <section id="blogs" className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-4">Latest Offers & Events</h2>
        <p className="text-gray-700 mb-6">Check out our newest promotions and updates</p>
        <div className="flex justify-center gap-4 px-4 flex-wrap">
          <img src="/vibes.png" alt="Offer 1" className="w-64 rounded shadow" />
          <img src="/juice.jpg" alt="Offer 1" className="w-64 rounded shadow" />
          <img src="/vegie.png" alt="Offer 2" className="w-64 rounded shadow" />
          <img src="/delivery.jpg" alt="Offer 1" className="w-64 rounded shadow" />
          <img src="/call.jpg" alt="Offer 2" className="w-64 rounded shadow" />
        </div>
        <div className="mt-6 space-x-4">
          <a href="#" className="text-blue-600 hover:underline">Facebook</a>
          <a href="#" className="text-pink-600 hover:underline">Instagram</a>
          <a href="#" className="text-blue-400 hover:underline">Twitter</a>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservations" className="py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Reservation & Reviews</h2>
        <form className="max-w-md mx-auto bg-white p-6 rounded shadow-lg border border-red-100">
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-4 p-2 border border-red-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border border-red-300 rounded"
          />
          <textarea
            placeholder="Review"
            className="w-full mb-4 p-2 border border-red-300 rounded"
          />
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Rating:</label>
            <select className="w-full p-2 border border-red-300 rounded">
              <option>1 Star</option>
              <option>2 Stars</option>
              <option>3 Stars</option>
              <option>4 Stars</option>
              <option>5 Stars</option>
            </select>
          </div>
          <button className="w-full bg-[#8B0000] text-white py-2 rounded hover:bg-red-700 transition">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
