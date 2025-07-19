import { useEffect } from 'react';
import { useServiceStore } from '../stores/useServiceStore';

const Services = () => {
  const { services, loading, error, fetchServices, clearError } = useServiceStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Fallback services if API fails or no services available
  const fallbackServices = [
    { emoji: "👩‍⚕️", title: "BNB Medical Stays", desc: "Daily rates, full support care, ideal for step-down recovery." },
    { emoji: "🧓", title: "Elderly Care", desc: "Specialized care for senior citizens in a peaceful home environment." },
    { emoji: "🛌", title: "Post-Surgery Recovery", desc: "For orthopedic, C-section, cancer, and other surgeries." },
    { emoji: "🏃‍♀️", title: "Physiotherapy Homes", desc: "Stays close to physiotherapy centers with trained staff." },
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;
  return (
    <section className="py-20 px-6 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Services</h2>
        <p className="text-gray-600 mb-12 text-lg">
          Tailored medical stays and compassionate care for every need.
        </p>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            <p className="mt-2 text-gray-600">Loading services...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <div className="text-red-600 mb-4">{error}</div>
            <button 
              onClick={() => { clearError(); fetchServices(); }}
              className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-900 transition"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayServices.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 border hover:-translate-y-1"
            >
              <div className="w-14 h-14 flex items-center justify-center text-3xl bg-blue-100 text-blue-800 rounded-full mb-4 mx-auto">
                {s.iconUrl ? (
                  <img src={s.iconUrl} alt={s.title} className="w-8 h-8" />
                ) : (
                  s.emoji || "🏥"
                )}
              </div>
              <h4 className="text-lg font-semibold text-center text-blue-900 mb-2">{s.title}</h4>
              <p className="text-sm text-gray-600 text-center">{s.description || s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
