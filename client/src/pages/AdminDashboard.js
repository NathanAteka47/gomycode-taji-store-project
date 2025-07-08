import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddProductForm from '../components/AddProductForm';
import AddWorkerForm from '../components/AddWorkerForm';
import WorkerList from '../components/WorkerList';
// import PosPage from '../components/Pospage';
import { motion } from 'framer-motion';
export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productRes, workerRes] = await Promise.all([
                    axios.get('http://localhost:5001/api/products'),
                    axios.get('http://localhost:5001/api/workers'),
                ]);
                if (Array.isArray(productRes.data))
                    setProducts(productRes.data);
                if (Array.isArray(workerRes.data))
                    setWorkers(workerRes.data);
            }
            catch (error) {
                console.error('Failed to fetch data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const removeProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/products/${id}`);
            setProducts(prev => prev.filter(p => p._id !== id));
        }
        catch (error) {
            console.error('Failed to remove product:', error);
        }
    };
    const removeWorker = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/workers/${id}`);
            setWorkers(prev => prev.filter(w => w._id !== id));
        }
        catch (error) {
            console.error('Failed to remove worker:', error);
        }
    };
    return (_jsxs("div", { className: "min-h-screen p-6 bg-gradient-to-br from-red-50 to-white text-red-900", children: [_jsx(motion.h1, { className: "text-4xl font-bold mb-10 text-center", initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: "\uD83D\uDEE0\uFE0F Admin Dashboard" }), loading ? (_jsx("p", { className: "text-center text-lg", children: "Loading dashboard data..." })) : (_jsxs(_Fragment, { children: [_jsx(AddProductForm, {}), _jsxs("section", { className: "my-10", children: [_jsx("h2", { className: "text-2xl font-semibold mb-6", children: "Product Inventory" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: products.map(product => (_jsxs(motion.div, { className: "border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition duration-300", whileHover: { scale: 1.02 }, children: [_jsx("img", { src: product.image, alt: product.name, onError: (e) => (e.target.src = '/default-image.jpg'), className: "w-full h-40 object-cover rounded mb-4" }), _jsx("h3", { className: "font-bold text-lg", children: product.name }), _jsx("p", { className: "text-sm text-gray-700 mb-1", children: product.description }), _jsxs("p", { className: "text-red-800 font-semibold mb-3", children: ["Ksh ", product.price.toLocaleString()] }), _jsx("button", { onClick: () => removeProduct(product._id), className: "bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800 transition", children: "Remove" })] }, product._id))) })] }), _jsx(AddWorkerForm, {}), _jsxs("section", { className: "my-10", children: [_jsx("h2", { className: "text-2xl font-semibold mb-6", children: "Workers Management" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: workers.map(worker => (_jsxs(motion.div, { className: "border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition duration-300", whileHover: { scale: 1.02 }, children: [_jsx("img", { src: worker.picture, alt: worker.name, onError: (e) => (e.target.src = '/default-avatar.png'), className: "w-24 h-24 rounded-full mx-auto mb-3 object-cover" }), _jsx("h3", { className: "font-bold text-lg text-center", children: worker.name }), _jsxs("p", { className: "text-sm text-center", children: ["ID: ", worker.workerId] }), _jsx("p", { className: "text-sm text-center text-gray-600 mb-2", children: worker.jobTitle }), _jsx("div", { className: "flex justify-center", children: _jsx("button", { onClick: () => removeWorker(worker._id), className: "bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800 transition", children: "Remove" }) })] }, worker._id))) })] }), _jsx(WorkerList, {})] }))] }));
}
