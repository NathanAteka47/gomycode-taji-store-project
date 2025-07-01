import { useState } from 'react';

interface ProductProps {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: 'food' | 'water' | 'cakes';
}

export default function ProductCard(product: ProductProps) {
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    const stored = localStorage.getItem('tajiCart');
    const cart = stored ? JSON.parse(stored) : [];

    const existing = cart.find((item: any) => item._id === product._id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem('tajiCart', JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white border shadow rounded p-4 text-red-900">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-sm text-gray-700">{product.description}</p>
      <p className="mt-2 font-bold">Ksh {product.price.toLocaleString()}</p>
      <button
        onClick={addToCart}
        className="bg-red-800 text-white px-4 py-2 mt-3 rounded hover:bg-red-700 transition"
      >
        {added ? '✅ Added' : 'Add to Cart'}
      </button>
    </div>
  );
}
