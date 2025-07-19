import { useCart } from '../hooks/useCart';
import { useState, useEffect } from 'react';
import { useHomeStore } from '../stores/useHomeStore';
import { OptimizedImage } from '../components/OptimizedImage';

const Homes = () => {
  const { cart, addToCart } = useCart();
  const { homes, loading, error, fetchHomes, clearError } = useHomeStore();
  const [open, setOpen] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    fetchHomes();
  }, [fetchHomes]);

  const handleAccordion = (homeId: string, pkgType: string) => {
    setOpen(prev => ({ ...prev, [`${homeId}-${pkgType}`]: !prev[`${homeId}-${pkgType}`] }));
  };

  if (loading) return (
    <div className="text-center py-20">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      <p className="mt-2 text-gray-600">Loading homes...</p>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-20">
      <div className="text-red-600 mb-4">{error}</div>
      <button 
        onClick={() => { clearError(); fetchHomes(); }}
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-900 transition"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <section className="py-20 px-6 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 mb-8">Available Homes</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {Array.isArray(homes) && homes.length > 0 ? homes.map((home) => (
            <div key={home._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition relative">
              <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-xs rounded-full">HOT</span>
              <div className="h-40 bg-gradient-to-br from-blue-200 to-white rounded-md mb-4 flex items-center justify-center text-gray-500 overflow-hidden">
                {home.images && home.images.length > 0 ? (
                  <OptimizedImage
                    src={home.images[0]}
                    alt={home.name}
                    className="h-full w-full object-cover rounded-md transition-opacity duration-300"
                    fallbackSrc="/img1.png"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <span className="text-4xl mb-2">🏠</span>
                    <span className="text-sm">Image Coming Soon</span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{home.name}</h3>
              <div className="grid grid-cols-1 gap-4">
                {home.packages.map((pkg: any) => {
                  const cartId = `${home._id}-${pkg.type}`;
                  const inCart = cart.some((item: any) => item.id === cartId);
                  return (
                    <div key={pkg.type} className="border rounded-lg p-4 mb-2 bg-blue-50">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-blue-800">{pkg.type} Package</span>
                        <span className="text-lg font-semibold text-blue-900">KES {pkg.price.toLocaleString()}</span>
                      </div>
                      <button
                        className="text-blue-700 underline text-sm mt-2"
                        onClick={() => handleAccordion(home._id, pkg.type)}
                        type="button"
                      >
                        {open[`${home._id}-${pkg.type}`] ? 'Hide inclusions' : 'Show inclusions'}
                      </button>
                      {open[`${home._id}-${pkg.type}`] && (
                        <ul className="mt-2 ml-4 list-disc text-gray-700 text-sm">
                          {pkg.inclusions.map((inc: string) => <li key={inc}>{inc}</li>)}
                        </ul>
                      )}
                      <button
                        onClick={() => addToCart({ id: cartId, name: `${home.name} - ${pkg.type}`, price: pkg.price })}
                        disabled={inCart}
                        className={`mt-4 px-4 py-2 rounded-full text-white font-medium w-full ${inCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-900'}`}
                      >
                        {inCart ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )) : (
            <div className="col-span-2 text-center text-gray-500">No homes available.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Homes;
