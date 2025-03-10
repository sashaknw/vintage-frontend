import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSearchOpen &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Search"]')
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Get the user's initial 
  const getUserInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U"; 
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className=" font-golos text-3xl font-bold text-black"
              >
                vintage vault
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-black-800 hover:text-amber-600 hover:border-amber-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="border-transparent text-black-800 hover:text-amber-600 hover:border-amber-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Shop
              </Link>
              <Link
                to="/categories"
                className="border-transparent text-black-800 hover:text-amber-600 hover:border-amber-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="border-transparent text-black-800 hover:text-amber-600 hover:border-amber-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/community"
                className="border-transparent text-black-800 hover:text-amber-600 hover:border-amber-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Community
              </Link>
            </div>
          </div>

          {/* Right side nav items */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Search Icon and Expandable Search Bar */}
            <div className="relative">
              <button
                aria-label="Search"
                className="p-1 rounded-full text-black-800 hover:text-amber-600 focus:outline-none"
                onClick={toggleSearch}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>

              {/* Expanding Search Bar */}
              <div
                className={`absolute right-0 top-0 mt-10 transition-all duration-300 ease-in-out overflow-hidden ${
                  isSearchOpen
                    ? "w-64 opacity-100 scale-100"
                    : "w-0 opacity-0 scale-95"
                }`}
              >
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex bg-white shadow-md rounded-md overflow-hidden"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for vintage items..."
                    className="px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-black px-3 py-2 text-white hover:bg-gray-800 transition"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="p-1 ml-3 rounded-full text-black-800 hover:text-amber-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    className="flex text-sm rounded-full focus:outline-none"
                    onClick={toggleMenu}
                  >
                    <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-black">
                      {getUserInitial()}
                    </div>
                  </button>
                </div>

                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-xl py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 hover:text-amber-700 cursor-pointer transition-colors duration-150"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 hover:text-amber-700 cursor-pointer transition-colors duration-150"
                    >
                      Your Orders
                    </Link>
                    <Link
                      to="/favorites"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 hover:text-amber-700 cursor-pointer transition-colors duration-150"
                    >
                      Favorites
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 hover:text-amber-700 cursor-pointer transition-colors duration-150"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="ml-3 flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-black-800 hover:text-amber-600 font-medium"
                >
                  Login
                </Link>
                <Link to="/register">
                  <button className="px-2 py-1 text-black border-2 border-black rounded-md font-medium hover:bg-black hover:text-white transition">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-800 hover:text-black hover:bg-[#fd6c55]"
            >
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="text-amber-800 hover:bg-amber-100 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-amber-800 hover:bg-amber-100 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
          >
            Shop
          </Link>
          <Link
            to="/categories"
            className="text-amber-800 hover:bg-amber-100 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
          >
            Categories
          </Link>
          <Link
            to="/about"
            className="text-amber-800 hover:bg-amber-100 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
          >
            About
          </Link>
        </div>

        {/* Mobile user menu */}
        {user ? (
          <div className="pt-4 pb-3 border-t border-amber-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-amber-700 flex items-center justify-center text-white font-medium">
                  {getUserInitial()}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-amber-900">
                  {user.name || user.email}
                </div>
                <div className="text-sm font-medium text-amber-600">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                to="/profile"
                className="block px-4 py-2 text-base font-medium text-amber-800 hover:bg-amber-100"
              >
                Your Profile
              </Link>
              <Link
                to="/orders"
                className="block px-4 py-2 text-base font-medium text-amber-800 hover:bg-amber-100"
              >
                Your Orders
              </Link>
              <Link
                to="/favorites"
                className="block px-4 py-2 text-base font-medium text-amber-800 hover:bg-amber-100"
              >
                Favorites
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-amber-800 hover:bg-amber-100"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-3 border-t border-amber-200">
            <div className="flex items-center justify-center space-x-4 px-4">
              <Link
                to="/login"
                className="text-amber-800 font-medium hover:text-amber-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-800"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
