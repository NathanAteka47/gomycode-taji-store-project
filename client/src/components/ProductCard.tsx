import { useState } from 'react';
import { IProduct } from '../types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';


interface ProductProps extends IProduct {}

export default function ProductCard(product: ProductProps) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white border shadow rounded p-4 text-red-900">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-sm text-gray-700">{product.description}</p>
      <p className="mt-2 font-bold">Ksh {product.price.toLocaleString()}</p>
      <button
        onClick={handleAddToCart}
        className="bg-red-800 text-white px-4 py-2 mt-3 rounded hover:bg-red-700 transition"
      >
        {added ? '✅ Added' : 'Add to Cart'}
      </button>
    </div>
  );
}
