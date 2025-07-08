import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// client/src/components/WorkerList.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function WorkerList() {
    const [workers, setWorkers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5001/api/workers')
            .then(res => setWorkers(res.data))
            .catch(err => {
            console.error('Failed to fetch workers', err);
            setWorkers([]);
        });
    }, []);
    return (_jsxs("div", { className: "mt-10", children: [_jsx("h2", { className: "text-2xl font-bold text-red-800 mb-4", children: "Restaurant Workers" }), workers.length === 0 ? (_jsx("p", { className: "text-gray-600", children: "No workers found." })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", children: workers.map(worker => (_jsxs("div", { className: "bg-white shadow-md border rounded-lg p-4 text-center", children: [_jsx("img", { src: worker.picture, alt: worker.name, className: "w-24 h-24 rounded-full mx-auto object-cover mb-3 border-2 border-red-800" }), _jsx("h3", { className: "text-lg font-semibold text-red-900", children: worker.name }), _jsxs("p", { className: "text-sm text-gray-600", children: ["ID: ", worker.workerId] }), _jsx("p", { className: "text-sm font-medium text-red-700", children: worker.jobTitle })] }, worker._id))) }))] }));
}
