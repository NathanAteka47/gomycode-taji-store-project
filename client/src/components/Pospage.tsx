import { useState, useEffect, useRef } from 'react';
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
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const receiptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/products')
      .then(res => Array.isArray(res.data) && setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  const addItem = (product: Product) => {
    const existing = saleItems.find(item => item._id === product._id);
    if (existing) {
      setSaleItems(prev => prev.map(item => item._id === product._id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setSaleItems(prev => [...prev, { ...product, qty: 1 }]);
    }
  };

  const adjustQty = (id: string, change: number) => {
    setSaleItems(prev => prev.map(item => item._id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item));
  };

  const total = saleItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const generateTransactionId = () => {
    const now = new Date();
    return `TJI-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const sendToWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/254718601536?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  const handleSubmit = async () => {
    if (saleItems.length === 0) return alert('No items to sell');

    const txnId = generateTransactionId();
    setTransactionId(txnId);

    const summaryText = saleItems.map(i => `- ${i.name} x${i.qty} @ Ksh ${i.price}`).join('\n');
    const message = `🧾 *New POS Sale*\nTransaction ID: ${txnId}\n${summaryText}\nTotal: Ksh ${total}\nTime: ${new Date().toLocaleString()}`;
    sendToWhatsApp(message);

    await axios.post('http://localhost:5001/api/sales', {
      worker: 'worker_id_placeholder', // You can dynamically fill this
      saleItems,
      totalAmount: total,
    });

    setMessage('✅ Sale complete. Sent to WhatsApp.');
    setSaleItems([]);
  };

  const handleSendDailySales = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/sales/today');
      const msg = `📊 *Daily Sales Report*\nTotal Orders: ${res.data.count}\nTotal Amount: Ksh ${res.data.total}`;
      sendToWhatsApp(msg);
    } catch (err) {
      alert('❌ Failed to fetch daily sales');
    }
  };

  return (
    <div className="bg-white text-red-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Point of Sale (POS)</h1>

      <input
        type="text"
        placeholder="Search food items..."
        className="p-2 border border-gray-400 rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mb-6">
        {['all', 'food', 'cakes', 'water'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`mr-2 px-4 py-2 rounded ${filter === cat ? 'bg-red-900 text-white' : 'bg-red-100 text-red-900'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {products
          .filter(p => (filter === 'all' || p.category === filter) && p.name.toLowerCase().includes(search.toLowerCase()))
          .map(product => (
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
          className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition my-2"
        >
          💵 Complete Sale & Send to WhatsApp
        </button>

        <button
          onClick={handleSendDailySales}
          className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 mt-2"
        >
          📤 Send Daily Sales to Manager
        </button>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
