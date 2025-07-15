import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector, useDispatch } from 'react-redux';
import { incrementQty, decrementQty, removeFromCart, } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
export default function CartPage() {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const handleProceedToCheckout = () => {
        navigate('/checkout');
    };
    return (_jsxs(motion.div, { className: "bg-white text-red-900 min-h-screen p-6", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, children: [_jsx("h1", { className: "text-3xl font-bold mb-8 text-center", children: "\uD83D\uDED2 Your Shopping Cart" }), cart.length === 0 ? (_jsx("p", { className: "text-center text-lg text-gray-600", children: "Your cart is empty." })) : (_jsxs("div", { className: "space-y-6", children: [cart.map(item => (_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition", children: [_jsxs("div", { className: "flex items-center gap-4 w-full md:w-1/3", children: [_jsx("img", { src: item.image, alt: item.name, className: "w-20 h-20 object-cover rounded-lg" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-lg", children: item.name }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Ksh ", item.price] })] })] }), _jsxs("div", { className: "flex items-center gap-3 mt-4 md:mt-0", children: [_jsx("button", { onClick: () => dispatch(decrementQty(item._id)), className: "bg-red-200 text-red-800 px-3 py-1 rounded hover:bg-red-300", children: "-" }), _jsx("span", { className: "font-bold", children: item.qty }), _jsx("button", { onClick: () => dispatch(incrementQty(item._id)), className: "bg-red-200 text-red-800 px-3 py-1 rounded hover:bg-red-300", children: "+" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2 mt-4 md:mt-0", children: [_jsxs("p", { className: "font-semibold", children: ["Ksh ", item.qty * item.price] }), _jsx("button", { onClick: () => dispatch(removeFromCart(item._id)), className: "text-sm text-red-600 hover:underline", children: "\u274C Remove" })] })] }, item._id))), _jsxs("div", { className: "text-right mt-8", children: [_jsxs("h2", { className: "text-xl font-bold", children: ["Subtotal: Ksh ", total.toLocaleString()] }), _jsx("p", { className: "text-sm text-gray-500", children: "Shipping and taxes calculated at checkout" }), _jsx("button", { onClick: handleProceedToCheckout, className: "mt-4 bg-red-800 text-white px-6 py-2 rounded hover:bg-red-700 transition shadow", children: "Proceed to Checkout \u27A1\uFE0F" })] })] }))] }));
}
