import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
export default function AddWorkerForm() {
    const [form, setForm] = useState({
        name: '',
        workerId: '',
        jobTitle: '',
        picture: ''
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/workers', form);
            alert('Worker added successfully');
        }
        catch {
            alert('Error adding worker');
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded shadow mb-6 max-w-md mx-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Add New Worker" }), _jsx("input", { type: "text", name: "name", placeholder: "Name", className: "w-full mb-3 p-2 border rounded", onChange: handleChange, required: true }), _jsx("input", { type: "text", name: "workerId", placeholder: "Worker ID", className: "w-full mb-3 p-2 border rounded", onChange: handleChange, required: true }), _jsx("input", { type: "text", name: "jobTitle", placeholder: "Job Title", className: "w-full mb-3 p-2 border rounded", onChange: handleChange, required: true }), _jsx("input", { type: "text", name: "picture", placeholder: "Profile Picture URL", className: "w-full mb-4 p-2 border rounded", onChange: handleChange, required: true }), _jsx("button", { type: "submit", className: "w-full bg-red-800 text-white py-2 rounded hover:bg-red-700", children: "Add Worker" })] }));
}
