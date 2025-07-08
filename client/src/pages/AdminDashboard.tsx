import { useEffect, useState } from 'react';
import axios from 'axios';
import AddProductForm from '../components/AddProductForm';
import AddWorkerForm from '../components/AddWorkerForm';
import WorkerList from '../components/WorkerList';
// import PosPage from '../components/Pospage';
import { motion } from 'framer-motion';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, workerRes] = await Promise.all([
          axios.get('http://localhost:5001/api/products'),
          axios.get('http://localhost:5001/api/workers'),
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
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to remove product:', error);
    }
  };

  const removeWorker = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/workers/${id}`);
      setWorkers(prev => prev.filter(w => w._id !== id));
    } catch (error) {
      console.error('Failed to remove worker:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-red-50 to-white text-red-900">
      <motion.h1
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🛠️ Admin Dashboard
      </motion.h1>

      {loading ? (
        <p className="text-center text-lg">Loading dashboard data...</p>
      ) : (
        <>
          {/* <PosPage /> */}

          {/* ➕ Product Form */}
          <AddProductForm />

          {/* 📦 Product Cards */}
          <section className="my-10">
            <h2 className="text-2xl font-semibold mb-6">Product Inventory</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <motion.div
                  key={product._id}
                  className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => ((e.target as HTMLImageElement).src = '/default-image.jpg')}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-700 mb-1">{product.description}</p>
                  <p className="text-red-800 font-semibold mb-3">Ksh {product.price.toLocaleString()}</p>
                  <button
                    onClick={() => removeProduct(product._id)}
                    className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800 transition"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ➕ Worker Form */}
          <AddWorkerForm />

          {/* 👨‍🍳 Worker Cards */}
          <section className="my-10">
            <h2 className="text-2xl font-semibold mb-6">Workers Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.map(worker => (
                <motion.div
                  key={worker._id}
                  className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={worker.picture}
                    alt={worker.name}
                    onError={(e) => ((e.target as HTMLImageElement).src = '/default-avatar.png')}
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="font-bold text-lg text-center">{worker.name}</h3>
                  <p className="text-sm text-center">ID: {worker.workerId}</p>
                  <p className="text-sm text-center text-gray-600 mb-2">{worker.jobTitle}</p>
                  <div className="flex justify-center">
                    <button
                      onClick={() => removeWorker(worker._id)}
                      className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800 transition"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 👥 Worker List (Optional Section) */}
          <WorkerList />
        </>
      )}
    </div>
  );
}
