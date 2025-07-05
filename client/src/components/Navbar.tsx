import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.qty, 0)
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("tajiUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserName(parsed.name);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tajiUser");
    localStorage.removeItem("tajiUserToken");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  return (
    <nav className="bg-[#8B0000] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Taji Store</h1>

        <ul className="flex gap-4 text-sm md:text-base font-medium">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/products" className="hover:underline">Our Products</Link></li>
          <li><Link to="/admin/login" className="hover:underline">Admin Login</Link></li>

          {isLoggedIn ? (
            <>
              <li className="hidden md:inline">Hi, {userName.split(" ")[0]}!</li>
              <li><Link to="/profile" className="hover:underline">My Account</Link></li>
              <li><button onClick={handleLogout} className="hover:underline">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
            </>
          )}
        </ul>

        {/* ✅ Cart Icon */}
        <div className="relative">
          <Link to="/cart" className="relative block">
            <FaShoppingCart className="text-white text-xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-900 text-xs font-bold px-1.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
