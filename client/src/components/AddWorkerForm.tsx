import { useState } from 'react';
import axios from 'axios';

export default function AddWorkerForm() {
  const [form, setForm] = useState({
    name: '',
    workerId: '',
    jobTitle: '',
    picture: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/workers', form);
      alert('Worker added successfully');
    } catch (err) {
      alert('Error adding worker');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Worker</h2>
      <input type="text" name="name" placeholder="Name" className="w-full mb-3 p-2 border rounded" onChange={handleChange} required />
      <input type="text" name="workerId" placeholder="Worker ID" className="w-full mb-3 p-2 border rounded" onChange={handleChange} required />
      <input type="text" name="jobTitle" placeholder="Job Title" className="w-full mb-3 p-2 border rounded" onChange={handleChange} required />
      <input type="text" name="picture" placeholder="Profile Picture URL" className="w-full mb-4 p-2 border rounded" onChange={handleChange} required />
      <button type="submit" className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700">Add Worker</button>
    </form>
  );
}
