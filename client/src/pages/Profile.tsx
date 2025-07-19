import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || '');
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch {}
    };
    fetchBookings();
  }, []);

  const handleSave = () => {
    // You would send username, password, and file to the backend here
    setMessage('✅ Profile updated (mock)');
  };

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">My Profile</h2>
        {message && <p className="text-center mb-4 text-green-600">{message}</p>}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden flex justify-center items-center">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-sm text-gray-500">No Image</span>
            )}
          </div>
          <input
            type="file"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
            className="text-sm"
          />
        </div>
        <input
          className="w-full p-3 border border-gray-300 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="w-full p-3 border border-gray-300 rounded mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />
        <button
          className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-900 transition"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h3 className="text-2xl font-bold mb-4 text-blue-900">My Bookings</h3>
        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-2 px-4 border">Home</th>
                  <th className="py-2 px-4 border">Package</th>
                  <th className="py-2 px-4 border">Dates</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-blue-50">
                    <td className="py-2 px-4 border">{b.home?.name || 'N/A'}</td>
                    <td className="py-2 px-4 border">{b.packageType}</td>
                    <td className="py-2 px-4 border">{new Date(b.checkIn).toLocaleDateString()} - {new Date(b.checkOut).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border">{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
