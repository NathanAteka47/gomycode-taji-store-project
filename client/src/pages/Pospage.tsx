import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface SaleItem {
  _id: string;
  name: string;
  price: number;
  qty: number;
}

export default function PosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [workerId, setWorkerId] = useState('');
  const [filter, setFilter] = useState('all');

  // ✅ Fetch products safely
  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error('Expected array, got:', res.data);
          setProducts([]);
        }
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setProducts([]);
      });
  }, []);

  // ✅ Add product to cart
  const addItem = (product: Product) => {
    const existing = saleItems.find(item => item._id === product._id);
    if (existing) {
      setSaleItems(prev =>
        prev.map(item => item._id === product._id ? { ...item, qty: item.qty + 1 } : item)
      );
    } else {
      setSaleItems(prev => [...prev, { ...product, qty: 1 }]);
    }
  };

  // ✅ Adjust quantity
  const adjustQty = (id: string, change: number) => {
    setSaleItems(prev =>
      prev.map(item => item._id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item)
    );
  };

  // ✅ Calculate total
  const total = saleItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Submit to /api/sales
  const handleSubmit = async () => {
    if (!workerId.trim()) {
      alert('Worker ID is required');
      return;
    }

    try {
      await axios.post('/api/sales', {
        worker: workerId,
        saleItems,
        totalAmount: total
      });
      alert('Sale recorded successfully');
      setSaleItems([]);
    } catch (err) {
      console.error(err);
      alert('Failed to record sale');
    }
  };

  return (
    <div className="bg-white text-red-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Point of Sale (POS)</h1>

      {/* Worker ID input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Worker ID"
          className="p-2 border border-red-300 rounded w-full"
          value={workerId}
          onChange={(e) => setWorkerId(e.target.value)}
        />
      </div>

      {/* Filter buttons */}
      <div className="mb-6">
        {['all', 'food', 'cakes', 'water'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`mr-2 px-4 py-2 rounded ${
              filter === cat ? 'bg-red-900 text-white' : 'bg-red-100 text-red-900'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Array.isArray(products) &&
          products.filter(p => filter === 'all' || p.category === filter).map(product => (
            <button
              key={product._id}
              onClick={() => addItem(product)}
              className="border rounded shadow hover:shadow-md p-2 flex flex-col items-center"
            >
              <img src={product.image} alt={product.name} className="w-24 h-24 object-cover mb-2" />
              <p>{product.name}</p>
              <p className="font-bold">Ksh {product.price}</p>
            </button>
        ))}
      </div>

      {/* Current Sale Summary */}
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Current Sale</h2>
        {saleItems.length === 0 ? (
          <p className="text-gray-600">No items added yet</p>
        ) : (
          saleItems.map(item => (
            <div key={item._id} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <div>
                <button onClick={() => adjustQty(item._id, -1)} className="px-2">-</button>
                <span className="mx-2">{item.qty}</span>
                <button onClick={() => adjustQty(item._id, 1)} className="px-2">+</button>
              </div>
              <span>Ksh {item.qty * item.price}</span>
            </div>
          ))
        )}
        <hr className="my-4" />
        <p className="text-lg font-bold">Total: Ksh {total.toLocaleString()}</p>
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Complete Sale
        </button>
      </div>
    </div>
  );
}
