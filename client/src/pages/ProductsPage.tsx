import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from '../types';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import { motion } from 'framer-motion';
import { OptimizedImage } from '../components/OptimizedImage';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

const fetchProducts = async () => {
  const res = await axios.get(`${VITE_API_BASE_URL}/api/products`);
  if (!Array.isArray(res.data)) throw new Error('Expected array of products.');
  return res.data;
};

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const {
    data: products = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
  });

  const filteredProducts = products.filter((product: IProduct) =>
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

      {(isLoading || isFetching) ? (
        <>
          {/* Spinner */}
          <div className="flex justify-center mb-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-red-500"></div>
          </div>

          {/* Skeleton Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-sm mb-4 text-center text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <OptimizedImage src="/images/placeholder.jpg" alt="No products" className="w-32 h-32 mb-4 opacity-60" />
                <p className="text-center text-gray-600 text-lg font-medium">No products matched your search.</p>
              </div>
            ) : (
              filteredProducts.map(product => (
                <motion.div
                  key={product._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.random() * 0.3 }}
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
