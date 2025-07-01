import { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products safely
  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="text-center col-span-full">No products found.</p>
          ) : (
            products.map(product => (
              <div key={product._id} className="border border-red-200 p-4 rounded shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-image.jpg';
                  }}
                />
                <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
                <p className="text-sm mb-2">{product.description}</p>
                <p className="font-bold mb-3">Ksh {product.price.toLocaleString()}</p>
                <button className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
