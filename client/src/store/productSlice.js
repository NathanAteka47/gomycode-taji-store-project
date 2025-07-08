import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';;
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await axios.get(`${VITE_API_BASE_URL}/api/products`);
    return res.data;
});
const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
            state.loading = true;
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
            .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch';
        });
    },
});
export default productSlice.reducer;
