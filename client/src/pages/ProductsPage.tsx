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
        } else {
          console.error('Expected array of products.');
        }
      })
      .catch(err => {
        console.error('Error fetching products:', err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-b from-white to-red-50 min-h-screen text-red-900 px-4 py-10"
    >
      <h1 className="text-4xl font-extrabold text-center mb-4 tracking-tight">Explore Our Products</h1>
      <p className="text-center text-gray-600 mb-8">Taste the tradition. Delivered with love.</p>

      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search for food, cakes, water..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border border-red-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />
      </div>

      {loading ? (
        <p className="text-center text-sm">Loading Taji delicacies...</p>
      ) : (
        <>
          <p className="text-sm mb-4 text-center text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredProducts.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">No products matched your search.</p>
            ) : (
              filteredProducts.map(product => (
                <motion.div
                  key={product._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
