import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
export default function AdminLogin() {
    const [adminNumber, setAdminNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        // Simulated login (replace with backend verification)
        if (adminNumber === '254254' && password === 'Taji') {
            localStorage.setItem('tajiAdmin', 'true');
            navigate('/admin/dashboard');
        }
        else {
            setError('❌ Invalid admin credentials. Please try again.');
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center px-4", children: _jsxs(motion.form, { onSubmit: handleLogin, initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "bg-white p-8 rounded-xl shadow-2xl w-full max-w-md", children: [_jsx("h2", { className: "text-3xl font-extrabold text-center text-red-800 mb-6", children: "Admin Login" }), error && (_jsx("p", { className: "text-sm text-center mb-4 text-red-600 font-semibold", children: error })), _jsxs("div", { className: "relative mb-5", children: [_jsx("input", { type: "text", id: "adminNumber", value: adminNumber, onChange: (e) => setAdminNumber(e.target.value), placeholder: "Admin Number", required: true, className: "peer w-full border-b-2 border-red-400 py-2 focus:outline-none placeholder-transparent" }), _jsx("label", { htmlFor: "adminNumber", className: "absolute top-0 left-0 text-sm text-gray-600 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-red-700", children: "Admin Number" })] }), _jsxs("div", { className: "relative mb-6", children: [_jsx("input", { type: "password", id: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password", required: true, autoComplete: "current-password", className: "peer w-full border-b-2 border-red-400 py-2 focus:outline-none placeholder-transparent" }), _jsx("label", { htmlFor: "password", className: "absolute top-0 left-0 text-sm text-gray-600 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-red-700", children: "Password" })] }), _jsx("button", { type: "submit", className: "w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition font-semibold", children: "Login" })] }) }));
}
