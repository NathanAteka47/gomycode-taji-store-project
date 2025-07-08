import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';;

interface User {
  _id: string;
  name: string;
  phoneNumber: string;
}

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  
  useEffect(() => {
    const storedUser = localStorage.getItem('tajiUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditedName(parsedUser.name);
      setEditedPhone(parsedUser.phoneNumber);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('tajiUser');
    localStorage.removeItem('tajiUserToken');
    alert('You have been logged out.');
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0]?.toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }
    try {
      const token = localStorage.getItem('tajiUserToken');
      await axios.put(`${VITE_API_BASE_URL}/api/users/${user?._id}/password`, {
        password: newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('✅ Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setMessage('❌ Error updating password');
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem('tajiUserToken');
      const res = await axios.put(`${VITE_API_BASE_URL}/api/users/${user?._id}`, {
        name: editedName,
        phoneNumber: editedPhone,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem('tajiUser', JSON.stringify(res.data));
      setUser(res.data);
      setEditMode(false);
      setMessage('✅ Profile updated successfully');
    } catch {
      setMessage('❌ Error updating profile');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8 text-red-900">
        {user ? (
          <>
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-800 to-red-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {getInitials(user.name)}
            </motion.div>

            <h2 className="text-2xl font-bold text-center mb-4">
              Welcome, <span className="text-red-700">{user.name.split(' ')[0]}</span>
            </h2>

            <div className="space-y-3 text-sm sm:text-base">
              {editMode ? (
                <>
                  <div className="mb-2">
                    <label className="block text-gray-600 font-medium">Full Name:</label>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-600 font-medium">Phone Number:</label>
                    <input
                      type="text"
                      value={editedPhone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <button
                    onClick={handleProfileUpdate}
                    className="w-full bg-red-700 hover:bg-red-600 text-white py-2 rounded font-semibold mt-2"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-600">Full Name:</span>
                    <span>{user.name}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-600">Phone Number:</span>
                    <span>{user.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-600">User ID:</span>
                    <span className="truncate max-w-[150px] text-xs text-gray-500">{user._id}</span>
                  </div>
                  <button
                    onClick={() => setEditMode(true)}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-white py-2 rounded font-semibold mt-4"
                  >
                    ✏️ Edit Profile
                  </button>
                </>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">🔐 Change Password</h3>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
              <button
                onClick={handlePasswordChange}
                className="w-full bg-red-700 hover:bg-red-600 text-white py-2 rounded font-semibold"
              >
                Update Password
              </button>
              {message && <p className="text-sm text-center mt-2 text-red-600">{message}</p>}
            </div>

            <motion.button
              onClick={handleLogout}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
            >
              🚪 Logout
            </motion.button>
          </>
        ) : (
          <p className="text-center animate-pulse text-gray-600">Loading user info...</p>
        )}
      </div>
    </motion.div>
  );
}
