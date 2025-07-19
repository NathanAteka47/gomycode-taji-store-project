import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const images = [
    '/images/hero1.jpg',
    '/images/hero2.jpg',
    '/images/hero3.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <header className="relative h-[80vh] text-white flex items-center justify-center overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={images[currentImageIndex]}
          alt="Hero Background"
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out rounded-xl shadow"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/placeholder.jpg';
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#8B0000]/70"></div>
      </div>

      {/* Glow Effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-20 animate-ping"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 animate-fadeInDown">
        <h1 className="text-4xl md:text-4xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-md">
          Welcome to <span className="text-blue-300">Taji</span> Three In One Store
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 font-light mb-8">
          Order delicious meals, cakes, and clean bottled water from anywhere — fast, fresh, and reliable.
        </p>
        <Link to="/products">
          <button className="px-8 py-3 text-lg bg-blue-400 hover:bg-yellow-500 text-red-900 font-semibold rounded-xl shadow-md transition transform hover:scale-105 duration-300">
            🍽️ View Our Products
          </button>
        </Link>
      </div>
    </header>
  );
};

export default HeroSection;
