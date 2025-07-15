import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
export default function CheckoutPage() {
    const cart = useSelector((state) => state.cart.items);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: '',
        address: '',
        city: '',
        phone: '',
        email: '',
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('tajiUser') || 'null');
        if (!user)
            navigate('/login');
        else
            setForm(prev => ({ ...prev, phone: user.phoneNumber, email: user.email }));
    }, [navigate]);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('tajiCheckoutForm', JSON.stringify(form));
        navigate('/payment-details');
    };
    return (_jsxs(motion.div, { className: "min-h-screen bg-gradient-to-br from-red-100 to-white text-red-900 p-6", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, children: [_jsx("h1", { className: "text-4xl font-extrabold mb-8 text-center text-red-800 tracking-wide", children: "Secure Checkout" }), _jsxs("form", { onSubmit: handleSubmit, className: "max-w-5xl mx-auto grid md:grid-cols-2 gap-8 shadow-lg rounded-lg bg-white p-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold mb-6 border-b pb-2", children: "Shipping Details" }), _jsx("input", { type: "text", name: "fullName", placeholder: "Full Name", value: form.fullName, onChange: handleChange, required: true, className: "w-full mb-4 p-3 border border-red-300 rounded focus:ring-2 focus:ring-red-500" }), _jsx("input", { type: "email", name: "email", placeholder: "Email Address", value: form.email, onChange: handleChange, required: true, className: "w-full mb-4 p-3 border border-red-300 rounded focus:ring-2 focus:ring-red-500" }), _jsx("input", { type: "text", name: "address", placeholder: "Address", value: form.address, onChange: handleChange, required: true, className: "w-full mb-4 p-3 border border-red-300 rounded focus:ring-2 focus:ring-red-500" }), _jsx("input", { type: "text", name: "city", placeholder: "City / Town", value: form.city, onChange: handleChange, required: true, className: "w-full mb-4 p-3 border border-red-300 rounded focus:ring-2 focus:ring-red-500" }), _jsx("input", { type: "text", name: "phone", placeholder: "Phone Number", value: form.phone, onChange: handleChange, required: true, className: "w-full mb-4 p-3 border border-red-300 rounded focus:ring-2 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold mb-6 border-b pb-2", children: "Order Summary" }), _jsxs("div", { className: "border p-6 rounded bg-gray-50 space-y-4", children: [cart.map((item) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "font-bold text-lg", children: item.name }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Qty: ", item.qty] })] }), _jsxs("p", { className: "font-bold text-red-700", children: ["Ksh ", (item.price * item.qty).toLocaleString()] })] }, item._id))), _jsx("hr", {}), _jsxs("div", { className: "flex justify-between font-bold text-xl", children: [_jsx("span", { children: "Total" }), _jsxs("span", { className: "text-red-800", children: ["Ksh ", total.toLocaleString()] })] }), _jsx("button", { type: "submit", className: "w-full bg-red-800 text-white py-3 mt-6 rounded hover:bg-red-700 text-lg font-semibold shadow-md transition", children: "\uD83D\uDE80 Confirm & Proceed to Payment" })] })] })] })] }));
}
