import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ItemDetails from "./pages/ItemDetails";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

import Community from "./pages/Community";
import CategoryPage from "./pages/CategoryPage";
import TopicPage from "./pages/TopicPage";
import CreateTopicPage from "./pages/CreateTopicPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import FollowedTopicsPage from "./pages/FollowedTopicsPage";


// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/item/:id" element={<ItemDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/community" element={<Community />} />
              <Route
                path="/community/category/:categoryId"
                element={<CategoryPage />}
              />
              <Route
                path="/community/category/:categoryId/new"
                element={<CreateTopicPage />}
              />
              <Route path="/community/topic/:topicId" element={<TopicPage />} />
              <Route path="/community/search" element={<SearchResultsPage />} />
              <Route
                path="/community/followed"
                element={<FollowedTopicsPage />}
              />

              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
