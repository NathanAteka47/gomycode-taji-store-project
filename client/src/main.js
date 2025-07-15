import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store'; // ✅ Make sure store.ts is created and exported
// import { VITE_API_BASE_URL } from '../constants/URLs';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'; // ✅ Use VITE_API_BASE_URL from environment variables
axios.defaults.baseURL = `${VITE_API_BASE_URL}/api`; // ✅ your backend URL
console.log('API Base URL:', VITE_API_BASE_URL); // ✅ Log the base URL to verify
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(App, {}) }) }));
