import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  incrementQty,
  decrementQty,
  clearCart,
} from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem('tajiUserToken');
    if (!token) {
      alert('Please login to proceed to checkout');
      return navigate('/login');
    }

    try {
      await axios.post(
        '/api/orders',
        {
          orderItems: cart,
          totalPrice: total
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Order placed successfully!');
      dispatch(clearCart());
    } catch (err: any) {
      console.error('Checkout error:', err.response || err.message || err);
      alert('Order failed. Please try again.');
    }
  };

  return (
    <div className="bg-white text-red-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm">Ksh {item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decrementQty(item._id))}
                  className="px-3 py-1 bg-red-200 rounded"
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => dispatch(incrementQty(item._id))}
                  className="px-3 py-1 bg-red-200 rounded"
                >
                  +
                </button>
              </div>
              <p className="font-semibold">Ksh {item.qty * item.price}</p>
            </div>
          ))}

          <div className="mt-6 text-lg font-bold">
            Total: Ksh {total.toLocaleString()}
          </div>

          <button
            onClick={handleCheckout}
            className="mt-4 bg-red-800 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
