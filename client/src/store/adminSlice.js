import { createSlice } from '@reduxjs/toolkit';
const initialState = {
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
