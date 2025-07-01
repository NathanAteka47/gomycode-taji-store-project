import { useEffect, useState } from 'react';
import axios from 'axios';
import AddProductForm from '../components/AddProductForm'; // adjust path if needed
import AddWorkerForm from '../components/AddWorkerForm';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface Worker {
  _id: string;
  name: string;
  workerId: string;
  jobTitle: string;
  picture: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products and workers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, workerRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/workers'),
        ]);

        if (Array.isArray(productRes.data)) setProducts(productRes.data);
        if (Array.isArray(workerRes.data)) setWorkers(workerRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeProduct = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to remove product:', error);
    }
  };

  const removeWorker = async (id: string) => {
    try {
      await axios.delete(`/api/workers/${id}`);
      setWorkers(prev => prev.filter(w => w._id !== id));
    } catch (error) {
      console.error('Failed to remove worker:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white text-red-800">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center text-lg">Loading data...</p>
      ) : (
        <>
          {/* Products Section */}
          <AddProductForm />
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product._id} className="border p-4 rounded shadow text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => ((e.target as HTMLImageElement).src = '/default-image.jpg')}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm mb-1">{product.description}</p>
                  <p className="text-sm font-semibold mb-2">Ksh {product.price.toLocaleString()}</p>
                  <button
                    onClick={() => removeProduct(product._id)}
                    className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Workers Section */}
          <AddWorkerForm />
          <section>
            <h2 className="text-2xl font-semibold mb-4">Workers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {workers.map(worker => (
                <div key={worker._id} className="border p-4 rounded shadow text-center">
                  <img
                    src={worker.picture}
                    alt={worker.name}
                    onError={(e) => ((e.target as HTMLImageElement).src = '/default-avatar.png')}
                    className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
                  />
                  <h3 className="font-bold text-lg">{worker.name}</h3>
                  <p className="text-sm">ID: {worker.workerId}</p>
                  <p className="text-sm mb-2">{worker.jobTitle}</p>
                  <button
                    onClick={() => removeWorker(worker._id)}
                    className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
