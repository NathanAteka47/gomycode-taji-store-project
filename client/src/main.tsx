import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store'; // ✅ Make sure store.ts is created and exported

axios.defaults.baseURL = 'http://localhost:5001/api'; // ✅ your backend URL

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
