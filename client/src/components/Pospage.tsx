import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import QRCode from 'qrcode';
import Receipt from '../components/Receipt';
import { motion } from 'framer-motion';

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

  const handleSubmit = async () => {
    if (saleItems.length === 0) return alert('No items to sell');

    const txnId = generateTransactionId();
    setTransactionId(txnId);

    const qrText = `Receipt: ${txnId}\nAmount: Ksh ${total}\nDate: ${new Date().toLocaleString()}`;
    const qr = await QRCode.toDataURL(qrText);
    setQrDataUrl(qr);

    await new Promise(resolve => setTimeout(resolve, 100));
    const receiptElement = receiptRef.current;
    if (!receiptElement) return;

    const pdfBlob = await html2pdf()
      .set({ html2canvas: { scale: 2 }, jsPDF: { format: 'a4' } })
      .from(receiptElement)
      .outputPdf('blob');

    const pdfFile = new File([pdfBlob], 'receipt.pdf', { type: 'application/pdf' });
    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('phone', '254718601536');
    formData.append('caption', `Taji Eats POS Receipt: ${txnId}`);

    try {
      await axios.post('http://localhost:5001/api/sales', {
        worker: 'worker_id_placeholder',
        saleItems,
        totalAmount: total,
      });

      await axios.post('http://localhost:5001/api/whatsapp/send', formData);

      setMessage('✅ Sale complete. Receipt sent to WhatsApp.');
      setSaleItems([]);
    } catch (err) {
      console.error('❌ Failed:', err);
      alert('❌ Sale failed or WhatsApp send failed.');
    }
  };

  const handleSendDailySales = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/sales/today');
      const msg = `📊 *Daily Sales Report*\nTotal Orders: ${res.data.count}\nTotal Amount: Ksh ${res.data.total}`;
      await axios.post('http://localhost:5001/api/whatsapp/text', {
        phone: '254718601536',
        message: msg,
      });
    } catch (err) {
      alert('❌ Failed to send daily report');
    }
  };

  return (
    <motion.div
      className="bg-white text-red-900 min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold mb-6">Taji POS System</h1>

      <input
        type="text"
        placeholder="Search food items..."
        className="p-2 border border-gray-400 rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {['all', 'food', 'cakes', 'water'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded ${filter === cat ? 'bg-red-900 text-white' : 'bg-red-100 text-red-900'} transition`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {products
          .filter(p => (filter === 'all' || p.category === filter) && p.name.toLowerCase().includes(search.toLowerCase()))
          .map(product => (
            <button
              key={product._id}
              onClick={() => addItem(product)}
              className="border rounded shadow hover:shadow-md p-2 flex flex-col items-center bg-white hover:bg-red-50"
            >
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover mb-2 rounded" />
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs font-bold">Ksh {product.price}</p>
            </button>
          ))}
      </div>

      <div className="bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">🧾 Current Sale</h2>

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
          💵 Complete Sale & Send Receipt
        </button>

        <button
          onClick={handleSendDailySales}
          className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 mt-2"
        >
          📤 Send Daily Sales to Manager
        </button>

        {message && <p className="mt-4 text-center text-green-700 font-semibold">{message}</p>}
      </div>

      <div className="hidden print:block bg-white p-4 mt-8 text-sm" ref={receiptRef}>
        <Receipt
          saleItems={saleItems}
          total={total}
          date={new Date().toLocaleString()}
          saleId={transactionId}
        />
      </div>
    </motion.div>
  );
}
