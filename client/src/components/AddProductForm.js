import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
;
export default function AddProductForm() {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        category: 'food',
        image: ''
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${VITE_API_BASE_URL}/api/products`, {
                ...form,
                price: parseFloat(form.price)
            });
            alert('Product added successfully');
        }
        catch {
            alert('Error adding product');
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded shadow mb-6 max-w-md mx-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Add New Product" }), _jsx("input", { type: "text", name: "name", placeholder: "Name", className: "w-full mb-3 p-2 border rounded", onChange: handleChange, required: true }), _jsx("input", { type: "text", name: "description", placeholder: "Description", className: "w-full mb-3 p-2 border rounded", onChange: handleChange, required: true }), _jsx("input", { type: "number", name: "price", placeholder: "Price", className: "w-full mb-3 p-2 border rounded", onChange: handleChange, required: true }), _jsxs("select", { name: "category", className: "w-full mb-3 p-2 border rounded", onChange: handleChange, children: [_jsx("option", { value: "food", children: "Food" }), _jsx("option", { value: "cakes", children: "Cakes" }), _jsx("option", { value: "water", children: "Water" })] }), _jsx("input", { type: "text", name: "image", placeholder: "Image URL", className: "w-full mb-4 p-2 border rounded", onChange: handleChange, required: true }), _jsx("button", { type: "submit", className: "w-full bg-red-800 text-white py-2 rounded hover:bg-red-700", children: "Add Product" })] }));
}
