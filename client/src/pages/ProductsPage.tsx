import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from '../types';
import ProductCard from '../components/ProductCard'; // adjust path as needed

// import { dummyProducts } from '../constants/products';

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products safely
  useEffect(() => {
    axios.get('http://localhost:5001/api/products')
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          console.log(res.data)
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

  return (
    <div className="bg-white min-h-screen p-6 text-red-800">
      <h1 className="text-3xl font-bold text-center mb-8">Our Product Selection</h1>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length === 0 ? (
            <p className="text-center col-span-full">No products found.</p>
          ) : (
products.map(product => (
  <ProductCard key={product._id} {...product} />
))

          )}
        </div>
      )}
    </div>
  );
}
