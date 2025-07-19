import { useCart } from '../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <section className="py-20 px-6 bg-white text-gray-800 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-blue-900">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">
          No homes added.{' '}
          <Link to="/homes" className="text-blue-700 underline hover:text-blue-900">
            Browse homes.
          </Link>
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border hover:shadow"
            >
              <div>
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-600">KES {item.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="border-t pt-4 mt-6">
            <p className="text-lg font-semibold">
              Total: <span className="text-blue-800">KES {total.toLocaleString()}</span>
            </p>
            <button
              onClick={() => navigate('/book')}
              className="mt-4 bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-900 transition"
            >
              Proceed to Booking
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
