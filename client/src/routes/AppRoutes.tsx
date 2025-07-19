import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Book from "../pages/Book";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLogin from "../pages/AdminLogin";
import Layout from "../components/Layout";
import Homes from "../pages/Homes";
import Cart from "../pages/Cart";
import Signup from "../pages/SignUp";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ForgotPassword from '../pages/ForgotPassword';

const AppRoutes = () => (
  <Routes>
    {/* Main site pages */}
    <Route
      path="/"
      element={
        <Layout>
          <Home />
        </Layout>
      }
    />
    <Route
      path="/about"
      element={
        <Layout>
          <About />
        </Layout>
      }
    />
    <Route
      path="/services"
      element={
        <Layout>
          <Services />
        </Layout>
      }
    />
    <Route
      path="/book"
      element={
        <Layout>
          <Book />
        </Layout>
      }
    />
    <Route
      path="/homes"
      element={
        <Layout>
          <Homes />
        </Layout>
      }
    />
    <Route
      path="/cart"
      element={
        <Layout>
          <Cart />
        </Layout>
      }
    />
    <Route
      path="/signup"
      element={
        <Layout>
          <Signup />
        </Layout>
      }
    />
    <Route
      path="/login"
      element={
        <Layout>
          <Login />
        </Layout>
      }
    />
    <Route
      path="/profile"
      element={
        <Layout>
          <Profile />
        </Layout>
      }
    />
    <Route
      path="/forgot-password"
      element={
        <Layout>
          <ForgotPassword />
        </Layout>
      }
    />


    {/* Admin pages (no layout) */}
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin-login" element={<AdminLogin />} />
  </Routes>
);

export default AppRoutes;
