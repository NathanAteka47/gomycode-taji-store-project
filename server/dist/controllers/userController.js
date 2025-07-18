"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.updateUserProfile = exports.updateUserPassword = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = require("../utils/bcrypt");
// 🔐 Utility to generate JWT token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
// ✅ @desc    Register a new user
// ✅ @route   POST /api/users/register
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber, password } = req.body;
    try {
        const existingUser = yield userModel_1.default.findOne({ phoneNumber });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const user = new userModel_1.default({
            name,
            phoneNumber,
            password, // Let the pre-save hook hash the password
        });
        yield user.save();
        const token = generateToken(user._id.toString());
        res.status(201).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                phoneNumber: user.phoneNumber,
                isAdmin: user.isAdmin,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
});
exports.registerUser = registerUser;
// ✅ @desc    Authenticate user & return token
// ✅ @route   POST /api/users/login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ phoneNumber });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        const isMatch = yield (0, bcrypt_1.pwdConfirm)(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        const token = generateToken(user._id.toString());
        res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                phoneNumber: user.phoneNumber,
                isAdmin: user.isAdmin,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
});
exports.loginUser = loginUser;
// ✅ @desc    Update user password
// ✅ @route   PUT /api/users/:id/password
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const hashedPassword = (0, bcrypt_1.pwdHasher)(password);
        user.password = hashedPassword;
        yield user.save();
        res.json({ message: 'Password updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateUserPassword = updateUserPassword;
// ✅ @desc    Update user profile
// ✅ @route   PUT /api/users/:id
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, phoneNumber } = req.body;
    try {
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(id, { name, phoneNumber }, { new: true }).select('-password');
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error });
    }
});
exports.updateUserProfile = updateUserProfile;
// POST /api/users/reset-password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, newPassword } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ phoneNumber });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        user.password = newPassword; // Let pre-save hook hash it
        yield user.save();
        res.json({ message: "Password updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.resetPassword = resetPassword;
