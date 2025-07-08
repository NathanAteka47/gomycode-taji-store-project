import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';;
export const fetchWorkers = createAsyncThunk('workers/fetch', async () => {
    const res = await axios.get(`${VITE_API_BASE_URL}/api/workers`);
    return res.data;
});
const workerSlice = createSlice({
    name: 'workers',
    initialState: {
        list: [],
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchWorkers.pending, state => {
            state.loading = true;
        })
            .addCase(fetchWorkers.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        })
            .addCase(fetchWorkers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch';
        });
    },
});
export default workerSlice.reducer;
