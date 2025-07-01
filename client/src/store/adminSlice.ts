import { createSlice } from '@reduxjs/toolkit';

interface AdminState {
  isLoggedIn: boolean;
}

const initialState: AdminState = {
  isLoggedIn: !!localStorage.getItem('tajiAdmin'),
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginAdmin(state) {
      state.isLoggedIn = true;
    },
    logoutAdmin(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('tajiAdmin');
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
