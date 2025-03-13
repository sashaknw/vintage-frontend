import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ItemDetails from "./pages/ItemDetails";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicProfile from "./components/PublicProfile";
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

import NewCategoryPage from "./pages/NewCategoryPage";
import AdminNewTopicPage from "./pages/AdminNewTopicPage";
import EditCategoryPage from "./pages/EditCategoryPage";
import AdminNewItem from "./components/AdminNewItem";


import ProtectedRoute from "./components/ProtectedRoute";

const AdminRoute = ({ children }) => {
  return (
    <ProtectedRoute>
      <AdminOnlyRoute>{children}</AdminOnlyRoute>
    </ProtectedRoute>
  );
};

const AdminOnlyRoute = ({ children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/community" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
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
              <Route path="/profile/:userId" element={<PublicProfile />} />

              {/* Protected  */}
              <Route
                path="/account"
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

              {/* Admin  */}
              <Route
                path="/community/new-category"
                element={
                  <AdminRoute>
                    <NewCategoryPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/community/new-topic"
                element={
                  <AdminRoute>
                    <AdminNewTopicPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/community/category/:categoryId/admin-new"
                element={
                  <AdminRoute>
                    <AdminNewTopicPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/community/category/:categoryId/edit"
                element={
                  <AdminRoute>
                    <EditCategoryPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/items/new"
                element={
                  <AdminRoute>
                    <AdminNewItem />
                  </AdminRoute>
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
