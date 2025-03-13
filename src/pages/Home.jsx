import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import FavoriteButton from "../components/FavoriteButton";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const [showOrientationPrompt, setShowOrientationPrompt] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setShowOrientationPrompt(isMobile && portrait);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await api.get("/api/items");
        const shuffled = response.data.sort(() => 0.5 - Math.random());

        setFeaturedItems(
          shuffled.slice(0, 4).map((item) => ({
            id: item._id,
            name: item.name,
            price: item.price,
            era: item.era,
            images: item.images,
            image: item.images[0],
          }))
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured items:", error);
        setError("Failed to fetch items");
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TypeAnimation
          sequence={["vintage vault...", 2000, "loading...", 5000]}
          wrapper="span"
          speed={20}
          cursor={true}
          repeat={2}
          className="text-black text-3xl font-sans font-bold"
          style={{ display: "inline-block" }}
        />
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
      {/* Orientation Prompt for Mobile */}
      {showOrientationPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center text-white p-6">
          <div className="animate-bounce mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="86"
              height="86"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"></path>
              <path d="M12 18h.01"></path>
              <path d="m21 7-4-4"></path>
              <path d="m17 7 4-4"></path>
            </svg>
          </div>
          <h2 className="text-8xl font-bold mb-4 text-center leading-tight">
            For Best Experience
          </h2>
          <p className="text-6xl mb-6 text-center">
            Please rotate your device to landscape mode
          </p>
          <button
            onClick={() => setShowOrientationPrompt(false)}
            className="bg-white text-black font-bold py-4 px-10 rounded-lg text-xl"
          >
            Continue in Portrait
          </button>
        </div>
      )}

      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline 
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              objectPosition: isPortrait ? "center" : "center",
            }}
          >
            <source
              src="https://res.cloudinary.com/dlkmeyasv/video/upload/v1741278765/girl-trying-on_zbkt6q.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="bg-white bg-opacity-10 p-4 sm:p-12 rounded-2xl w-full max-w-xl backdrop-blur-md space-y-6 sm:space-y-12">
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 mb-4 sm:mb-6">
              <TypeAnimation
                sequence={[
                  "Timeless Style, Sustainable Fashion",
                  3000,
                  "Like-minded Community & Spaces",
                  2000,
                ]}
                wrapper="span"
                speed={20}
                cursor={true}
                repeat={2}
                style={{ display: "inline-block" }}
              />
            </h1>
            <p className="text-base sm:text-lg text-slate-200 mb-4 sm:mb-8">
              Discover unique vintage pieces from every decade. Connect with the
              local fashion community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-auto sm:min-w-[180px] sm:max-w-[220px]">
                <Link to="/shop" className="block w-full">
                  <a
                    href="#_"
                    className="relative inline-block text-lg group w-full"
                  >
                    <span className="relative z-10 block px-5 py-3 sm:py-4 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-black rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-5 py-3 sm:py-4 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black group-hover:-rotate-180 ease"></span>
                      <span className="relative">Shop Selection</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-black rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </a>
                </Link>
              </div>

              <div className="w-full sm:w-auto sm:min-w-[180px] sm:max-w-[220px]">
                <Link to="/community" className="block w-full">
                  <a
                    href="#_"
                    className="relative inline-block text-lg group w-full"
                  >
                    <span className="relative z-10 block px-5 py-3 sm:py-4 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-black rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-5 py-3 sm:py-4 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black group-hover:-rotate-180 ease"></span>
                      <span className="relative">Community</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-black rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-black-900 mb-8 sm:mb-12">
            Featured Pieces
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item._id || item.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <Link
                  to={`/item/${item._id || item.id}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative block h-full"
                >
                  <div className="relative">
                    <FavoriteButton itemId={item._id || item.id} />

                    <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                      <img
                        src={item.image || (item.images && item.images[0])}
                        alt={item.name}
                        className="w-full h-48 sm:h-64 object-contain bg-gray-50 transition duration-300 group-hover:scale-105"
                      />

                      {item.images && item.images.length > 1 && (
                        <img
                          src={item.images[1]}
                          alt={`${item.name} - alternate view`}
                          className="w-full h-48 sm:h-64 object-contain bg-gray-50 absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                        />
                      )}
                    </div>
                  </div>
                  <div className="p-2 sm:p-4">
                    <p className="text-xs sm:text-sm text-black-600 mb-1">
                      {item.era}
                    </p>
                    <h3 className="text-sm sm:text-lg font-medium text-gray-900 mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="font-medium text-sm sm:text-base text-black-700">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <div className="inline-block sm:min-w-[180px] sm:max-w-[220px]">
              <Link to="/shop" className="relative inline-block text-lg group">
                <span className="relative z-10 block px-5 py-3 sm:py-4 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-black rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 sm:py-4 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black group-hover:-rotate-180 ease"></span>
                  <span className="relative">View All Items</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-black rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-12 sm:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-white mb-8 sm:mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12 font-golos">
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
                className="relative group"
              >
                <div className="relative flex items-center justify-center h-14 sm:h-16 md:h-20 rounded-xl border-2 border-white overflow-hidden group-hover:border-transparent transition-all duration-300">
                  <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <rect
                      width="100%"
                      height="100%"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeDasharray="10,10"
                      strokeLinecap="round"
                      rx="12"
                      ry="12"
                      className="dash-animation"
                    />
                  </svg>

                  <h3 className="text-base sm:text-xl md:text-2xl font-medium text-white z-10 group-hover:text-[#feff26]">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <style jsx>{`
          .dash-animation {
            stroke-dashoffset: 0;
            animation: dash 20s linear infinite;
          }

          @keyframes dash {
            to {
              stroke-dashoffset: 500;
            }
          }
        `}</style>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3 sm:mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-white max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
            Subscribe to our newsletter for early access to new arrivals,
            exclusive vintage finds, and style inspiration.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow rounded-md px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <div className="sm:min-w-[120px] sm:max-w-[180px]">
              <button type="submit" className="w-full">
                <a
                  href="#_"
                  className="relative inline-block text-lg group w-full"
                >
                  <span className="relative z-10 block px-4 sm:px-5 py-2 sm:py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-black rounded-lg group-hover:text-white">
                    <span className="absolute inset-0 w-full h-full px-4 sm:px-5 py-2 sm:py-3 rounded-lg bg-gray-50"></span>
                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black group-hover:-rotate-180 ease"></span>
                    <span className="relative">Subscribe</span>
                  </span>
                  <span
                    className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-black rounded-lg group-hover:mb-0 group-hover:mr-0"
                    data-rounded="rounded-lg"
                  ></span>
                </a>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
