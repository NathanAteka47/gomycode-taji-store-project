import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
export default function UserProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedPhone, setEditedPhone] = useState('');
    useEffect(() => {
        const storedUser = localStorage.getItem('tajiUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setEditedName(parsedUser.name);
            setEditedPhone(parsedUser.phoneNumber);
        }
        else {
            navigate('/login');
        }
    }, [navigate]);
    const handleLogout = () => {
        localStorage.removeItem('tajiUser');
        localStorage.removeItem('tajiUserToken');
        alert('You have been logged out.');
        navigate('/login');
    };
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(part => part[0]?.toUpperCase())
            .join('')
            .slice(0, 2);
    };
    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('❌ Passwords do not match');
            return;
        }
        try {
            const token = localStorage.getItem('tajiUserToken');
            await axios.put(`http://localhost:5001/api/users/${user?._id}/password`, {
                password: newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('✅ Password updated successfully');
            setNewPassword('');
            setConfirmPassword('');
        }
        catch {
            setMessage('❌ Error updating password');
        }
    };
    const handleProfileUpdate = async () => {
        try {
            const token = localStorage.getItem('tajiUserToken');
            const res = await axios.put(`http://localhost:5001/api/users/${user?._id}`, {
                name: editedName,
                phoneNumber: editedPhone,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.setItem('tajiUser', JSON.stringify(res.data));
            setUser(res.data);
            setEditMode(false);
            setMessage('✅ Profile updated successfully');
        }
        catch {
            setMessage('❌ Error updating profile');
        }
    };
    return (_jsx(motion.div, { className: "min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-6", initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: _jsx("div", { className: "bg-white shadow-2xl rounded-xl w-full max-w-md p-8 text-red-900", children: user ? (_jsxs(_Fragment, { children: [_jsx(motion.div, { className: "w-20 h-20 rounded-full bg-gradient-to-tr from-red-800 to-red-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6", initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 0.5 }, children: getInitials(user.name) }), _jsxs("h2", { className: "text-2xl font-bold text-center mb-4", children: ["Welcome, ", _jsx("span", { className: "text-red-700", children: user.name.split(' ')[0] })] }), _jsx("div", { className: "space-y-3 text-sm sm:text-base", children: editMode ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-2", children: [_jsx("label", { className: "block text-gray-600 font-medium", children: "Full Name:" }), _jsx("input", { type: "text", value: editedName, onChange: (e) => setEditedName(e.target.value), className: "w-full border p-2 rounded" })] }), _jsxs("div", { className: "mb-2", children: [_jsx("label", { className: "block text-gray-600 font-medium", children: "Phone Number:" }), _jsx("input", { type: "text", value: editedPhone, onChange: (e) => setEditedPhone(e.target.value), className: "w-full border p-2 rounded" })] }), _jsx("button", { onClick: handleProfileUpdate, className: "w-full bg-red-700 hover:bg-red-600 text-white py-2 rounded font-semibold mt-2", children: "Save Changes" })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between border-b pb-2", children: [_jsx("span", { className: "font-medium text-gray-600", children: "Full Name:" }), _jsx("span", { children: user.name })] }), _jsxs("div", { className: "flex justify-between border-b pb-2", children: [_jsx("span", { className: "font-medium text-gray-600", children: "Phone Number:" }), _jsx("span", { children: user.phoneNumber })] }), _jsxs("div", { className: "flex justify-between border-b pb-2", children: [_jsx("span", { className: "font-medium text-gray-600", children: "User ID:" }), _jsx("span", { className: "truncate max-w-[150px] text-xs text-gray-500", children: user._id })] }), _jsx("button", { onClick: () => setEditMode(true), className: "w-full bg-yellow-500 hover:bg-yellow-400 text-white py-2 rounded font-semibold mt-4", children: "\u270F\uFE0F Edit Profile" })] })) }), _jsxs("div", { className: "mt-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "\uD83D\uDD10 Change Password" }), _jsx("input", { type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), placeholder: "New Password", className: "w-full border border-gray-300 rounded p-2 mb-2" }), _jsx("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "Confirm Password", className: "w-full border border-gray-300 rounded p-2 mb-2" }), _jsx("button", { onClick: handlePasswordChange, className: "w-full bg-red-700 hover:bg-red-600 text-white py-2 rounded font-semibold", children: "Update Password" }), message && _jsx("p", { className: "text-sm text-center mt-2 text-red-600", children: message })] }), _jsx(motion.button, { onClick: handleLogout, whileTap: { scale: 0.95 }, className: "mt-6 w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition", children: "\uD83D\uDEAA Logout" })] })) : (_jsx("p", { className: "text-center animate-pulse text-gray-600", children: "Loading user info..." })) }) }));
}
