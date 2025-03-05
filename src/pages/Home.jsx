import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
//import axios from "axios";

const Home = () => {
 const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        // Adjust the URL to your backend endpoint
        const response = await api.get('/api/items');
        
        // Randomly select 4 items for featured section
        const shuffled = response.data.sort(() => 0.5 - Math.random());
        setFeaturedItems(shuffled.slice(0, 4).map(item => ({
          id: item._id,
          name: item.name,
          price: item.price,
          era: item.era,
          image: item.images[0], // Use first image
        })));
        
        setLoading(false);
         } catch (err) {
        setError('Failed to fetch items');
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-amber-700 text-xl">Loading vintage treasures...</p>
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
      <section className="relative bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center py-12 md:py-24">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-6">
                Timeless Style, Sustainable Fashion
              </h1>
              <p className="text-lg text-amber-800 mb-8">
                Discover unique vintage pieces from every decade. Each item
                tells a story and has been carefully selected for quality and
                character.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-md text-lg font-medium transition"
                >
                  Shop Collection
                </Link>
                <Link
                  to="/about"
                  className="bg-white hover:bg-gray-100 text-amber-700 border border-amber-700 px-6 py-3 rounded-md text-lg font-medium transition"
                >
                  Our Story
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://agreeabletyrant.dar.org/wp-content/uploads/2017/03/placeholder.jpg"
                alt="Vintage clothing collection"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center text-amber-900 mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              "Dresses",
              "Tops",
              "Bottoms",
              "Outerwear",
              "Accessories",
              "Shoes",
            ].map((category) => (
              <Link
                key={category}
                to={`/shop?category=${category.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg h-48 md:h-64"
              >
                <img
                  src={`https://agreeabletyrant.dar.org/wp-content/uploads/2017/03/placeholder.jpg`}
                  alt={category}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-medium">{category}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/categories"
              className="inline-block border-b-2 border-amber-600 text-amber-700 hover:text-amber-900 font-medium"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center text-amber-900 mb-12">
            Featured Pieces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Link
                key={item.id}
                to={`/item/${item.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover object-center group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-amber-600 mb-1">{item.era}</p>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="font-medium text-amber-700">
                    €{item.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-md font-medium transition"
            >
              View All Items
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-amber-100 max-w-2xl mx-auto mb-8">
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
            <button
              type="submit"
              className="bg-amber-900 hover:bg-amber-800 text-white px-6 py-3 rounded-md font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
