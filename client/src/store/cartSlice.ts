import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(item => item._id === action.payload._id);
      if (existing) {
        existing.qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    incrementQty(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i._id === action.payload);
      if (item) {
        item.qty += 1;
      }
    },
    decrementQty(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i._id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

// ✅ Make sure you export everything
export const { addToCart, removeFromCart, incrementQty, decrementQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
