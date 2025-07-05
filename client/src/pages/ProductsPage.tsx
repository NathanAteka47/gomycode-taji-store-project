import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from '../types';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/api/products')
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          console.log(res.data);
        } else {
          console.error('Expected product array but got:', res.data);
        }
      })
      .catch(err => {
        console.error('Failed to load products:', err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter products based on search input
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white min-h-screen p-6 text-red-800">
        <h1 className="text-3xl font-bold text-center mb-8">Our Product Selection</h1>

        {/* ✅ Search Bar */}
        <div className="mb-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.length === 0 ? (
              <p className="text-center col-span-full">No products found.</p>
            ) : (
              filteredProducts.map(product => (
                <ProductCard key={product._id} {...product} />
              ))
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
