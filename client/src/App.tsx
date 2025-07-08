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

  if (!splashDone) return <SplashScreen />;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<UserProfile />} /> {/* ✅ New route */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-details" element={<PaymentDetailsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
