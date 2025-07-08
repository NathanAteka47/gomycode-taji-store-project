import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
export default function PosPage() {
    const [products, setProducts] = useState([]);
    const [saleItems, setSaleItems] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        axios.get('http://localhost:5001/api/products')
            .then(res => Array.isArray(res.data) && setProducts(res.data))
            .catch(() => setProducts([]));
    }, []);
    const addItem = (product) => {
        const existing = saleItems.find(item => item._id === product._id);
        if (existing) {
            setSaleItems(prev => prev.map(item => item._id === product._id ? { ...item, qty: item.qty + 1 } : item));
        }
        else {
            setSaleItems(prev => [...prev, { ...product, qty: 1 }]);
        }
    };
    const adjustQty = (id, change) => {
        setSaleItems(prev => prev.map(item => item._id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item));
    };
    const total = saleItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const handleSubmit = async () => {
        if (saleItems.length === 0)
            return alert('No items to sell');
        try {
            await axios.post('http://localhost:5001/api/sales', {
                worker: 'worker_id_placeholder',
                saleItems,
                totalAmount: total,
            });
            setMessage('✅ Sale complete.');
            setSaleItems([]);
        }
        catch {
            alert('❌ Sale failed.');
        }
    };
    const handleSendDailySales = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/sales/today');
            const msg = `📊 *Daily Sales Report*\nTotal Orders: ${res.data.count}\nTotal Amount: Ksh ${res.data.total}`;
            await axios.post('http://localhost:5001/api/whatsapp/text', {
                phone: '254718601536',
                message: msg,
            });
        }
        catch {
            alert('❌ Failed to send daily report');
        }
    };
    return (_jsxs(motion.div, { className: "bg-white text-red-900 min-h-screen p-6", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 }, children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Taji POS System" }), _jsx("input", { type: "text", placeholder: "Search food items...", className: "p-2 border border-gray-400 rounded w-full mb-4", value: search, onChange: (e) => setSearch(e.target.value) }), _jsx("div", { className: "mb-6 flex flex-wrap gap-2", children: ['all', 'food', 'cakes', 'water'].map((cat) => (_jsx("button", { onClick: () => setFilter(cat), className: `px-4 py-2 rounded ${filter === cat ? 'bg-red-900 text-white' : 'bg-red-100 text-red-900'} transition`, children: cat.toUpperCase() }, cat))) }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8", children: products
                    .filter(p => (filter === 'all' || p.category === filter) && p.name.toLowerCase().includes(search.toLowerCase()))
                    .map(product => (_jsxs("button", { onClick: () => addItem(product), className: "border rounded shadow hover:shadow-md p-2 flex flex-col items-center bg-white hover:bg-red-50", children: [_jsx("img", { src: product.image, alt: product.name, className: "w-20 h-20 object-cover mb-2 rounded" }), _jsx("p", { className: "text-sm font-medium", children: product.name }), _jsxs("p", { className: "text-xs font-bold", children: ["Ksh ", product.price] })] }, product._id))) }), _jsxs("div", { className: "bg-gray-100 p-4 rounded shadow", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "\uD83E\uDDFE Current Sale" }), saleItems.length === 0 ? (_jsx("p", { className: "text-gray-600", children: "No items added yet" })) : (saleItems.map(item => (_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("span", { children: item.name }), _jsxs("div", { children: [_jsx("button", { onClick: () => adjustQty(item._id, -1), className: "px-2", children: "-" }), _jsx("span", { className: "mx-2", children: item.qty }), _jsx("button", { onClick: () => adjustQty(item._id, 1), className: "px-2", children: "+" })] }), _jsxs("span", { children: ["Ksh ", item.qty * item.price] })] }, item._id)))), _jsx("hr", { className: "my-4" }), _jsxs("p", { className: "text-lg font-bold", children: ["Total: Ksh ", total.toLocaleString()] }), _jsx("button", { onClick: handleSubmit, className: "w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition my-2", children: "\uD83D\uDCB5 Complete Sale" }), _jsx("button", { onClick: handleSendDailySales, className: "w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 mt-2", children: "\uD83D\uDCE4 Send Daily Sales to Manager" }), message && _jsx("p", { className: "mt-4 text-center text-green-700 font-semibold", children: message })] })] }));
}
