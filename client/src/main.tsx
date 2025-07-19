import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store'; // ✅ Make sure store.ts is created and exported
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { VITE_API_BASE_URL } from '../constants/URLs';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'; // ✅ Use VITE_API_BASE_URL from environment variables

axios.defaults.baseURL = `${VITE_API_BASE_URL}/api`; // ✅ your backend URL
console.log('API Base URL:', VITE_API_BASE_URL); // ✅ Log the base URL to verify
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
