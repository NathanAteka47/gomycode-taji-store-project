import { createContext } from 'react';

export interface HomeItem {
  id: string;
  name: string;
  price: number;
}

interface CartContextType {
  cart: HomeItem[];
  cartCount: number;
  addToCart: (item: HomeItem) => void;
  removeFromCart: (id: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined); 