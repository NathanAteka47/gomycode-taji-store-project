import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  incrementQty,
  decrementQty,
  removeFromCart,
} from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <motion.div
      className="bg-white text-red-900 min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map(item => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-between items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 w-full md:w-1/3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-600">Ksh {item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => dispatch(decrementQty(item._id))}
                  className="bg-red-200 text-red-800 px-3 py-1 rounded hover:bg-red-300"
                >
                  -
                </button>
                <span className="font-bold">{item.qty}</span>
                <button
                  onClick={() => dispatch(incrementQty(item._id))}
                  className="bg-red-200 text-red-800 px-3 py-1 rounded hover:bg-red-300"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col items-center gap-2 mt-4 md:mt-0">
                <p className="font-semibold">Ksh {item.qty * item.price}</p>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="text-sm text-red-600 hover:underline"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-8">
            <h2 className="text-xl font-bold">Subtotal: Ksh {total.toLocaleString()}</h2>
            <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout</p>
            <button
              onClick={handleProceedToCheckout}
              className="mt-4 bg-red-800 text-white px-6 py-2 rounded hover:bg-red-700 transition shadow"
            >
              Proceed to Checkout ➡️
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
