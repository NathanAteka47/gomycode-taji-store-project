import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
export default function ProductCard(product) {
    const dispatch = useDispatch();
    const [added, setAdded] = useState(false);
    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, qty: 1 }));
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };
    return (_jsxs(motion.div, { className: "relative bg-white rounded-2xl shadow-lg overflow-hidden p-4 flex flex-col", whileHover: { scale: 1.03 }, transition: { type: 'spring', stiffness: 300 }, children: [_jsx("div", { className: "absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded shadow", children: "HOT" }), _jsx("div", { className: "overflow-hidden rounded-xl", children: _jsx("img", { src: product.image, alt: product.name, className: "w-full h-40 object-cover transform hover:scale-105 transition duration-300" }) }), _jsxs("div", { className: "flex-1 mt-3", children: [_jsx("h2", { className: "text-lg font-bold line-clamp-1", children: product.name }), _jsx("p", { className: "text-sm text-gray-700 line-clamp-2", children: product.description }), _jsx("div", { className: "flex gap-1 text-yellow-400 mt-2", children: [...Array(5)].map((_, i) => (_jsx(FaStar, { size: 14 }, i))) }), _jsxs("p", { className: "mt-2 font-bold text-lg", children: ["Ksh ", product.price.toLocaleString()] })] }), _jsx("button", { onClick: handleAddToCart, className: `mt-4 py-2 rounded font-medium transition-all duration-300 ${added
                    ? 'bg-green-600 text-white'
                    : 'bg-red-800 hover:bg-red-700 text-white'}`, children: added ? '✅ Added' : 'Add to Cart' })] }));
}
