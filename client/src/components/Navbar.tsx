import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useSelector((state: any) => state.cart.items || []);
  const cartCount = cart.reduce((sum: number, item: any) => sum + item.qty, 0);

  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.qty, 0)
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("tajiUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const initials = user.name
        .split(" ")
        .map((part: string) => part[0]?.toUpperCase())
        .join("")
        .slice(0, 2);
      setUserInitials(initials);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUserInitials("");
    }
  }, []);

  // Add this effect to listen for login changes
  useEffect(() => {
    const onStorageChange = () => {
      const storedUser = localStorage.getItem("tajiUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const initials = user.name
          .split(" ")
          .map((part: string) => part[0]?.toUpperCase())
          .join("")
          .slice(0, 2);
        setUserInitials(initials);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserInitials("");
      }
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tajiUser");
    localStorage.removeItem("tajiUserToken");
    setIsLoggedIn(false);
    setUserInitials("");
    navigate("/login");
  };

  return (
    <nav className="bg-[#8B0000] text-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">Taji Store</Link>

        {/* Hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-sm font-medium">
          <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
          <li><Link to="/products" className="hover:text-yellow-300">Products</Link></li>
          <li><Link to="/admin/login" className="hover:text-yellow-300">Admin</Link></li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/profile" className="hover:opacity-80">
                  <div className="w-9 h-9 rounded-full bg-yellow-100 text-red-900 font-bold flex items-center justify-center text-sm shadow">
                    {userInitials}
                  </div>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-yellow-300">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login" className="hover:text-yellow-300">Login</Link></li>
          )}
        </ul>

        {/* Cart Icon with Preview */}
        <div className="relative ml-4">
          <button
            className="relative"
            onClick={() => setCartOpen((open) => !open)}
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => setTimeout(() => setCartOpen(false), 300)}
            aria-label="Cart"
          >
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-900 rounded-full px-2 text-xs font-bold shadow">
                {cartCount}
              </span>
            )}
          </button>
          {cartOpen && cart.length > 0 && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white text-red-900 rounded-lg shadow-lg p-4 z-50 animate-fadeIn"
              onMouseEnter={() => setCartOpen(true)}
              onMouseLeave={() => setCartOpen(false)}
            >
              <h4 className="font-bold mb-2">Cart Preview</h4>
              <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
                {cart.slice(0, 4).map((item: any) => (
                  <li key={item._id} className="py-2 flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.jpg'; }} />
                    <span className="flex-1 text-sm">{item.name}</span>
                    <span className="text-xs font-bold">x{item.qty}</span>
                  </li>
                ))}
              </ul>
              <Link to="/cart" className="block mt-3 text-center bg-red-700 text-white py-1 rounded hover:bg-red-800 transition">View Cart</Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#8B0000] px-4 pb-4 transition-all duration-300">
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/" onClick={() => setMobileOpen(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setMobileOpen(false)}>Products</Link></li>
            <li><Link to="/admin/login" onClick={() => setMobileOpen(false)}>Admin</Link></li>

            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile" onClick={() => setMobileOpen(false)}>
                    <div className="w-9 h-9 rounded-full bg-yellow-100 text-red-900 font-bold flex items-center justify-center text-sm shadow">
                      {userInitials}
                    </div>
                  </Link>
                </li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <li><Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link></li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
