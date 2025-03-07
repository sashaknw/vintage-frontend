import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
//import axios from "axios";

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fix for the fetchFeaturedItems function in your Home.jsx

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
     
        const response = await api.get("/api/items");
        const shuffled = response.data.sort(() => 0.5 - Math.random());

        // OPTION 1: Preserve the entire item structure including images array
       // setFeaturedItems(shuffled.slice(0, 4));

        
      setFeaturedItems(shuffled.slice(0, 4).map(item => ({
        id: item._id,
        name: item.name,
        price: item.price,
        era: item.era,
        images: item.images, // Keep the entire images array
        image: item.images[0] // For backward compatibility
      })));
      

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch items");
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-black text-xl">Loading vintage treasures...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://res.cloudinary.com/dlkmeyasv/video/upload/v1741278765/girl-trying-on_zbkt6q.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="bg-white bg-opacity-10 p-12 rounded-2xl max-w-xl w-full backdrop-blur-md space-y-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-100 mb-6">
              Timeless Style, Sustainable Fashion
            </h1>
            <p className="text-lg text-slate-200 mb-8">
              Discover unique vintage pieces from every decade. Each item tells
              a story and has been carefully selected for quality and character.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="w-full sm:w-auto">
                <a
                  href="#_"
                  className="relative inline-block text-lg group w-full"
                >
                  <span className="relative z-10 block px-5 py-4 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                    <span className="absolute inset-0 w-full h-full px-5 py-4 rounded-lg bg-gray-50"></span>
                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                    <span className="relative">Shop Selection</span>
                  </span>
                  <span
                    className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                    data-rounded="rounded-lg"
                  ></span>
                </a>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <a
                  href="#_"
                  className="relative inline-block text-lg group w-full"
                >
                  <span className="relative z-10 block px-5 py-4 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                    <span className="absolute inset-0 w-full h-full px-5 py-4 rounded-lg bg-gray-50"></span>
                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                    <span className="relative">About Us</span>
                  </span>
                  <span
                    className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                    data-rounded="rounded-lg"
                  ></span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      {/* Featured Items */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center text-black-900 mb-12">
            Featured Pieces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Link
                key={item._id || item.id}
                to={`/item/${item._id || item.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="aspect-w-3 aspect-h-4 overflow-hidden relative">
                  {/* Primary image */}
                  <img
                    src={item.image || (item.images && item.images[0])}
                    alt={item.name}
                    className="w-full h-64 object-contain bg-gray-50 transition duration-300 group-hover:scale-105"
                  />

                 
            {item.images && item.images.length > 1 && (
              <img
                src={item.images[1]}
                alt={`${item.name} - alternate view`}
                className="w-full h-64 object-contain bg-gray-50 absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
              />
            )}
            
                </div>
                <div className="p-4">
                  <p className="text-sm text-black-600 mb-1">{item.era}</p>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="font-medium text-black-700">
                    €{item.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/shop" className="relative inline-block text-lg group">
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">View All Items</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </Link>
          </div>
        </div>
      </section>
      {/* Categories Preview */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-12">
          <h2 className="text-3xl font-serif font-bold text-center text-white mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { name: "Dresses" },
              { name: "Tops" },
              { name: "Bottoms" },
              { name: "Outerwear" },
              { name: "Accessories" },
              { name: "Shoes" },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/shop?category=${category.name.toLowerCase()}`}
                className="group relative rounded-xl overflow-hidden"
              >
                <div className="relative flex items-center justify-center h-16 md:h-20 overflow-hidden rounded-xl">
                  {/* Static dotted border with rounded corners */}
                  <div className="absolute inset-0 border-4 border-white border-dashed  rounded-xl group-hover:opacity-0 transition-all duration-400 ease-in-out"></div>

                  {/* Animated trail effect on hover */}
                  <div
                    className="absolute inset-0 border-4 border-white border-dashed opacity-0 group-hover:opacity-100 rounded-xl animate-pulse transition-all duration-500 ease-in-out"
                    style={{
                      animation: "borderTrail 2s linear infinite",
                    }}
                  ></div>

                  {/* CSS animation for the trail effect */}
                  <style jsx>{`
                    @keyframes borderTrail {
                      0% {
                        border-style: dashed;
                        border-spacing: 6px;
                      }
                      50% {
                        border-style: dotted;
                        border-spacing: 4px;
                      }
                      100% {
                        border-style: dashed;
                        border-spacing: 2px;
                      }
                    }
                  `}</style>

                  {/* Category name */}
                  <h3 className="text-xl md:text-2xl font-medium text-white z-10">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-white max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for early access to new arrivals,
            exclusive vintage finds, and style inspiration.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <button type="submit">
              <a href="#_" className="relative inline-block text-lg group">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative">Subscribe</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
