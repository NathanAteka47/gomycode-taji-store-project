import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SplashScreen from "./components/SplashScreen";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage';
import UserProfile from './pages/UserProfile';
import CheckoutPage from './pages/CheckoutPage';
import Footer from './components/Footer';
import PaymentDetailsPage from './pages/PaymentDetailsPage';
import { useState, useEffect } from 'react';
function App() {
    const [splashDone, setSplashDone] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setSplashDone(true), 3000); // Sync with SplashScreen
        return () => clearTimeout(timer);
    }, []);
    if (!splashDone)
        return _jsx(SplashScreen, {});
    return (_jsxs(Router, { children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/products", element: _jsx(ProductsPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignupPage, {}) }), _jsx(Route, { path: "/admin/login", element: _jsx(AdminLoginPage, {}) }), _jsx(Route, { path: "/admin/dashboard", element: _jsx(AdminDashboard, {}) }), _jsx(Route, { path: "/cart", element: _jsx(CartPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(UserProfile, {}) }), " ", _jsx(Route, { path: "/checkout", element: _jsx(CheckoutPage, {}) }), _jsx(Route, { path: "/payment-details", element: _jsx(PaymentDetailsPage, {}) })] }), _jsx(Footer, {})] }));
}
export default App;
