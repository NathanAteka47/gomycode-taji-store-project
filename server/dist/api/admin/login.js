"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const adminLogin = (req, res) => {
    const { adminId, password } = req.body;
    if (adminId === '254254' && password === 'Taji') {
        return res.status(200).json({ message: 'Login successful' });
    }
    else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};
exports.adminLogin = adminLogin;
