import { useState } from 'react';
import { IProduct } from '../types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

export default function ProductCard(product: IProduct) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden p-4 flex flex-col"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* Optional Badge */}
      <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded shadow">
        HOT
      </div>

      {/* Product Image */}
      <div className="overflow-hidden rounded-xl group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover transform group-hover:scale-110 transition duration-300 rounded-xl shadow"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/placeholder.jpg';
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 mt-3">
        <h2 className="text-lg font-bold line-clamp-1">{product.name}</h2>
        <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>

        {/* Rating Placeholder */}
        <div className="flex gap-1 text-yellow-400 mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={14} />
          ))}
        </div>

        <p className="mt-2 font-bold text-lg">Ksh {product.price.toLocaleString()}</p>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className={`mt-4 py-2 rounded font-medium transition-all duration-300 ${
          added
            ? 'bg-green-600 text-white'
            : 'bg-red-800 hover:bg-red-700 text-white'
        }`}
      >
        {added ? '✅ Added' : 'Add to Cart'}
      </button>
    </motion.div>
  );
}
