import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-red-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Taji Store</h2>
          <p className="text-sm text-gray-200">
            Your one-stop shop for authentic Kenyan dishes, cakes, and bottled water. Tradition meets modernity.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition duration-300">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition duration-300">
              <FaInstagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition duration-300">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-yellow-300 transition duration-300">Home</Link></li>
            <li><Link to="/products" className="hover:text-yellow-300 transition duration-300">Menu</Link></li>
            <li><Link to="/cart" className="hover:text-yellow-300 transition duration-300">Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-yellow-300 transition duration-300">Checkout</Link></li>
            <li><Link to="/profile" className="hover:text-yellow-300 transition duration-300">My Account</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <FaPhone /> +254 718 690 000
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> support@tajistore.co.ke
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} Taji Store. All rights reserved.
      </div>
    </footer>
  );
}
