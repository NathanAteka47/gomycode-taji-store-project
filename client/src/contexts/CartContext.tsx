import { createContext, useState} from 'react';
import type { ReactNode } from 'react';

// Define item type
export interface HomeItem {
  id: string;
  name: string;
  price: number;
}

// Define CartContext type
interface CartContextType {
  cart: HomeItem[];
  cartCount: number;
  addToCart: (item: HomeItem) => void;
  removeFromCart: (id: string) => void;
}

// Create context with correct default type
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<HomeItem[]>([]);

  const addToCart = (item: HomeItem) => {
    if (!cart.find((h) => h.id === item.id)) {
      setCart((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, cartCount: cart.length, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
