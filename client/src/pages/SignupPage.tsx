import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');
  const navigate = useNavigate();

  const checkStrength = (pwd: string) => {
    if (pwd.length < 6) return setStrength('Weak');
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      setStrength('Strong');
    } else {
      setStrength('Moderate');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5001/api/users/register', {
        name,
        phoneNumber,
        password,
      });
      const { token, ...userData } = res.data;
      localStorage.setItem('tajiUserToken', token);
      localStorage.setItem('tajiUser', JSON.stringify(userData));
      alert('Account created successfully!');
      navigate('/login');
    } catch (err: any) {
      console.error('Signup error:', err.response?.data || err.message);
      const message = err.response?.data?.message || 'Signup failed.';
      alert(message);
    }
  };

  return (
    <div className="bg-white text-red-800 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border border-red-300 rounded"
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full mb-4 p-3 border border-red-300 rounded"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkStrength(e.target.value);
            }}
            className="w-full p-3 border border-red-300 rounded"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-sm text-gray-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
          {password && (
            <p className={`text-sm mt-1 ${strength === 'Strong' ? 'text-green-600' : strength === 'Moderate' ? 'text-orange-500' : 'text-red-500'}`}>
              Password Strength: {strength}
            </p>
          )}
        </div>

        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-6 p-3 border border-red-300 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
