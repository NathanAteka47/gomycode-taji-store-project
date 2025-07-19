import { CartContext } from './CartContextDef';
import { useState, ReactNode } from 'react';
import type { HomeItem } from './CartContextDef';

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
