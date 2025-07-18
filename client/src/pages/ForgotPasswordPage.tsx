import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export default function ForgotPasswordPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${VITE_API_BASE_URL}/api/users/reset-password`, {
        phoneNumber,
        newPassword,
      });

      if (response.data?.message === "Password updated successfully") {
        setMessage("✅ Password reset successful. Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("❌ Reset failed. User not found or server error.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to reset password. Please check phone number.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-200 to-red-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">Reset Password</h2>

        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="w-full border-b-2 border-red-400 focus:outline-none py-2 mb-4"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full border-b-2 border-red-400 focus:outline-none py-2 mb-4"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border-b-2 border-red-400 focus:outline-none py-2 mb-6"
        />

        <button
          type="submit"
          className="w-full py-2 bg-red-700 text-white rounded hover:bg-red-600 transition"
        >
          Reset Password
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}

        <p className="text-sm mt-6 text-center text-gray-600">
          Remembered your password?{" "}
          <Link to="/login" className="text-red-600 underline font-medium">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}
