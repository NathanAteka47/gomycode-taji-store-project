import { useState } from 'react';
import axios from 'axios';

export default function AddProductForm() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'food',
    image: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/products', {
        ...form,
        price: parseFloat(form.price)
      });
      alert('Product added successfully');
    } catch (err) {
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <input type="text" name="name" placeholder="Name" className="w-full mb-3 p-2 border rounded" onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" className="w-full mb-3 p-2 border rounded" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" className="w-full mb-3 p-2 border rounded" onChange={handleChange} required />
      <select name="category" className="w-full mb-3 p-2 border rounded" onChange={handleChange}>
        <option value="food">Food</option>
        <option value="cakes">Cakes</option>
        <option value="water">Water</option>
      </select>
      <input type="text" name="image" placeholder="Image URL" className="w-full mb-4 p-2 border rounded" onChange={handleChange} required />
      <button type="submit" className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700">Add Product</button>
    </form>
  );
}
