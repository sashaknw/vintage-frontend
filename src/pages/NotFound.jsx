import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-serif font-bold text-amber-800">404</h1>
        <div className="h-1 w-16 bg-amber-600 mx-auto my-6"></div>
        <h2 className="text-3xl font-serif font-medium text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-12">
          We couldn't find the page you're looking for. The page may have been
          moved, or the link might be incorrect.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-amber-700 text-white rounded-md font-medium hover:bg-amber-800 transition"
          >
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition"
          >
            Browse Collection
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-gray-500 text-sm">
            Need help?{" "}
            <Link to="/contact" className="text-amber-700 hover:text-amber-900">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
