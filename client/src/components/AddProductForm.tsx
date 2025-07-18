import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export default function AddProductForm() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'food',
    image: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      await axios.post(`${VITE_API_BASE_URL}/api/products`, {
        ...form,
        price: parseFloat(form.price)
      });
      setMessage('✅ Product added successfully!');
      setForm({ name: '', description: '', price: '', category: 'food', image: '' });
    } catch {
      setMessage('❌ Error adding product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow mb-6 max-w-md mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Add Product Form"
    >
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
      <input type="text" id="name" name="name" placeholder="Name" className="w-full mb-3 p-2 border rounded" onChange={handleChange} value={form.name} required />
      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <input type="text" id="description" name="description" placeholder="Description" className="w-full mb-3 p-2 border rounded" onChange={handleChange} value={form.description} required />
      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
      <input type="number" id="price" name="price" placeholder="Price" className="w-full mb-3 p-2 border rounded" onChange={handleChange} value={form.price} required />
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
      <select id="category" name="category" className="w-full mb-3 p-2 border rounded" onChange={handleChange} value={form.category}>
        <option value="food">Food</option>
        <option value="cakes">Cakes</option>
        <option value="water">Water</option>
      </select>
      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
      <input type="text" id="image" name="image" placeholder="Image URL" className="w-full mb-4 p-2 border rounded" onChange={handleChange} value={form.image} required />
      {form.image && (
        <img src={form.image} alt="Preview" className="w-24 h-24 object-cover rounded mb-4 border" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.jpg'; }} />
      )}
      <button type="submit" className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
      {message && <p className="mt-3 text-center text-sm text-gray-700">{message}</p>}
    </motion.form>
  );
}
