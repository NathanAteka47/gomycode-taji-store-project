// client/src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import adminReducer from './adminSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
