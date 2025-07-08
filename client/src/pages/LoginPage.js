import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/users/login", {
                phoneNumber,
                password,
            });
            const { token, user } = res.data; // ✅ Ensure your backend returns { token, user }
            localStorage.setItem("tajiUserToken", token);
            localStorage.setItem("tajiUser", JSON.stringify(user));
            alert("Login successful!");
            navigate("/");
            window.location.reload(); // Refresh the page after navigating home
        }
        catch (err) {
            console.error("Login error:", err.message);
            alert("❌ Invalid credentials. Please try again.");
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-red-800 to-red-600", children: _jsxs(motion.form, { onSubmit: handleLogin, initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "bg-white p-8 rounded-xl shadow-2xl max-w-md w-full", children: [_jsx("h2", { className: "text-3xl font-extrabold text-center text-red-800 mb-6", children: "Welcome Back to Taji" }), _jsxs("div", { className: "relative mb-6", children: [_jsx("input", { type: "text", id: "phone", value: phoneNumber, onChange: (e) => setPhoneNumber(e.target.value), required: true, autoComplete: "username", className: "peer w-full border-b-2 border-red-400 focus:outline-none focus:border-red-700 py-2 placeholder-transparent", placeholder: "Phone Number" }), _jsx("label", { htmlFor: "phone", className: "absolute left-0 top-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-red-700", children: "Phone Number" })] }), _jsxs("div", { className: "relative mb-6", children: [_jsx("input", { type: visible ? "text" : "password", id: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, autoComplete: "current-password", className: "peer w-full border-b-2 border-red-400 focus:outline-none focus:border-red-700 py-2 placeholder-transparent", placeholder: "Password" }), _jsx("label", { htmlFor: "password", className: "absolute left-0 top-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-red-700", children: "Password" }), _jsx("span", { onClick: () => setVisible(!visible), className: "absolute right-2 top-2.5 text-gray-500 cursor-pointer", children: visible ? _jsx(FaEyeSlash, {}) : _jsx(FaEye, {}) })] }), _jsx("button", { type: "submit", className: "w-full py-2 bg-red-800 text-white rounded hover:bg-red-700 transition font-semibold", children: "Login" }), _jsxs("p", { className: "text-sm mt-4 text-center text-gray-600", children: ["Don\u2019t have an account?", " ", _jsx(Link, { to: "/signup", className: "text-red-600 font-medium underline", children: "Sign Up" })] })] }) }));
}
