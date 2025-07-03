import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  phoneNumber: string;
}

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('tajiUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8 text-red-900">
        {user ? (
          <>
            {/* Avatar initials */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-800 to-red-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              {getInitials(user.name)}
            </div>

            <h2 className="text-2xl font-bold text-center mb-4">Welcome, {user.name.split(' ')[0]}</h2>

            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Full Name:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Phone Number:</span>
                <span>{user.phoneNumber}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">User ID:</span>
                <span className="truncate max-w-[150px] text-xs text-gray-500">{user._id}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-center">Loading user info...</p>
        )}
      </div>
    </div>
  );
}
