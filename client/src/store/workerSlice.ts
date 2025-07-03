import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWorkers = createAsyncThunk('workers/fetch', async () => {
  const res = await axios.get('http://localhost:5001/api/workers');
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
