import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInitials, setUserInitials] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const totalItems = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.qty, 0));
    useEffect(() => {
        const storedUser = localStorage.getItem("tajiUser");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            const initials = user.name
                .split(" ")
                .map((part) => part[0]?.toUpperCase())
                .join("")
                .slice(0, 2);
            setUserInitials(initials);
            setIsLoggedIn(true);
        }
        else {
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
                    .map((part) => part[0]?.toUpperCase())
                    .join("")
                    .slice(0, 2);
                setUserInitials(initials);
                setIsLoggedIn(true);
            }
            else {
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
    return (_jsxs("nav", { className: "bg-[#8B0000] text-white shadow-md sticky top-0 z-50", children: [_jsxs("div", { className: "max-w-6xl mx-auto px-4 py-3 flex justify-between items-center", children: [_jsx(Link, { to: "/", className: "text-2xl font-bold tracking-tight", children: "Taji Store" }), _jsx("button", { className: "md:hidden text-white text-2xl", onClick: () => setMobileOpen(!mobileOpen), children: mobileOpen ? _jsx(FaTimes, {}) : _jsx(FaBars, {}) }), _jsxs("ul", { className: "hidden md:flex gap-6 items-center text-sm font-medium", children: [_jsx("li", { children: _jsx(Link, { to: "/", className: "hover:text-yellow-300", children: "Home" }) }), _jsx("li", { children: _jsx(Link, { to: "/products", className: "hover:text-yellow-300", children: "Products" }) }), _jsx("li", { children: _jsx(Link, { to: "/admin/login", className: "hover:text-yellow-300", children: "Admin" }) }), isLoggedIn ? (_jsxs(_Fragment, { children: [_jsx("li", { children: _jsx(Link, { to: "/profile", className: "hover:opacity-80", children: _jsx("div", { className: "w-9 h-9 rounded-full bg-yellow-100 text-red-900 font-bold flex items-center justify-center text-sm shadow", children: userInitials }) }) }), _jsx("li", { children: _jsx("button", { onClick: handleLogout, className: "hover:text-yellow-300", children: "Logout" }) })] })) : (_jsx("li", { children: _jsx(Link, { to: "/login", className: "hover:text-yellow-300", children: "Login" }) }))] }), _jsx("div", { className: "relative", children: _jsxs(Link, { to: "/cart", className: "relative block", children: [_jsx(FaShoppingCart, { className: "text-white text-xl" }), totalItems > 0 && (_jsx("span", { className: "absolute -top-2 -right-2 bg-white text-red-900 text-xs font-bold px-1.5 rounded-full", children: totalItems }))] }) })] }), mobileOpen && (_jsx("div", { className: "md:hidden bg-[#8B0000] px-4 pb-4 transition-all duration-300", children: _jsxs("ul", { className: "space-y-3 text-sm font-medium", children: [_jsx("li", { children: _jsx(Link, { to: "/", onClick: () => setMobileOpen(false), children: "Home" }) }), _jsx("li", { children: _jsx(Link, { to: "/products", onClick: () => setMobileOpen(false), children: "Products" }) }), _jsx("li", { children: _jsx(Link, { to: "/admin/login", onClick: () => setMobileOpen(false), children: "Admin" }) }), isLoggedIn ? (_jsxs(_Fragment, { children: [_jsx("li", { children: _jsx(Link, { to: "/profile", onClick: () => setMobileOpen(false), children: _jsx("div", { className: "w-9 h-9 rounded-full bg-yellow-100 text-red-900 font-bold flex items-center justify-center text-sm shadow", children: userInitials }) }) }), _jsx("li", { children: _jsx("button", { onClick: handleLogout, children: "Logout" }) })] })) : (_jsx("li", { children: _jsx(Link, { to: "/login", onClick: () => setMobileOpen(false), children: "Login" }) }))] }) }))] }));
}
