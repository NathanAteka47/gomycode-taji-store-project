
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-[#8B0000] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Taji Store</h1>
        <ul className="flex gap-4 text-sm md:text-base font-medium">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/products" className="hover:underline">Our Products</Link></li>
          <li><Link to="/admin/login" className="hover:underline">Admin Login</Link></li>
          <li><Link to="/login" className="hover:underline">Login</Link></li>
          <li><Link to="/pos" className="hover:underline">POS</Link></li>
        </ul>
        <div className="relative">
          <Link to="/cart" className="relative block">
  <FaShoppingCart className="text-white text-xl" />
  <span className="absolute -top-2 -right-2 bg-white text-red-900 text-xs font-bold px-1.5 rounded-full">0</span>
</Link>
        </div>
      </div>
    </nav>
  );
}