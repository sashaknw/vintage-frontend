import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  // Sample category data
  const categories = [
    {
      id: "tops",
      name: "Tops",
      description: "Vintage t-shirts, blouses, and shirts",
      image: "https://via.placeholder.com/600x400",
      count: 42,
    },
    {
      id: "bottoms",
      name: "Bottoms",
      description: "Vintage jeans, skirts, and pants",
      image: "https://via.placeholder.com/600x400",
      count: 38,
    },
    {
      id: "dresses",
      name: "Dresses",
      description: "Vintage dresses from all eras",
      image: "https://via.placeholder.com/600x400",
      count: 27,
    },
    {
      id: "outerwear",
      name: "Outerwear",
      description: "Vintage jackets, coats, and sweaters",
      image: "https://via.placeholder.com/600x400",
      count: 31,
    },
    {
      id: "accessories",
      name: "Accessories",
      description: "Vintage bags, jewelry, and more",
      image: "https://via.placeholder.com/600x400",
      count: 56,
    },
    {
      id: "shoes",
      name: "Shoes",
      description: "Vintage footwear for all occasions",
      image: "https://via.placeholder.com/600x400",
      count: 19,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-center text-amber-900 mb-12">
        Shop by Category
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/shop?category=${category.id}`}
            className="group"
          >
            <div className="overflow-hidden rounded-lg shadow-md transition duration-300 hover:shadow-xl">
              <div className="relative h-64">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition duration-300"></div>
              </div>
              <div className="bg-white p-6">
                <h2 className="text-xl font-medium text-amber-900 mb-2 group-hover:text-amber-700">
                  {category.name}
                  <span className="text-sm font-normal text-amber-600 ml-2">
                    ({category.count})
                  </span>
                </h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
