"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
// 🔁 Central route loader
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// CORS configuration for deployed and local frontend
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ✅ Load all routes from routes/index.ts
app.use(routes_1.default);
// Test route
app.get('/api', (req, res) => {
    res.send('Taji Online Store API is running...');
});
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
