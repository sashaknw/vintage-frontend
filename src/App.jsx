import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const LoadingSpinner = () => (
  <div className="w-full h-screen flex justify-center items-center bg-black">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#feff27]"></div>
  </div>
);

// Lazy-loaded ones
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const ItemDetails = lazy(() => import("./pages/ItemDetails"));
const Categories = lazy(() => import("./pages/Categories"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const PublicProfile = lazy(() => import("./components/PublicProfile"));
const Profile = lazy(() => import("./pages/Profile"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Favorites = lazy(() => import("./pages/Favorites"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Community = lazy(() => import("./pages/Community"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const TopicPage = lazy(() => import("./pages/TopicPage"));
const CreateTopicPage = lazy(() => import("./pages/CreateTopicPage"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const FollowedTopicsPage = lazy(() => import("./pages/FollowedTopicsPage"));
const NewCategoryPage = lazy(() => import("./pages/NewCategoryPage"));
const AdminNewTopicPage = lazy(() => import("./pages/AdminNewTopicPage"));
const EditCategoryPage = lazy(() => import("./pages/EditCategoryPage"));
const AdminNewItem = lazy(() => import("./components/AdminNewItem"));
const ModerationDashboard = lazy(() =>
  import("./components/forum/ModerationDashboard")
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/community" />;
  }

  return children;
};

const routes = [
  // Publiqueee
  { path: "/", element: <Home />, isPrivate: false },
  { path: "/shop", element: <Shop />, isPrivate: false },
  { path: "/item/:id", element: <ItemDetails />, isPrivate: false },
  { path: "/categories", element: <Categories />, isPrivate: false },
  { path: "/about", element: <About />, isPrivate: false },
  { path: "/login", element: <Login />, isPrivate: false },
  { path: "/register", element: <Register />, isPrivate: false },
  { path: "/cart", element: <Cart />, isPrivate: false },
  { path: "/profile/:userId", element: <PublicProfile />, isPrivate: false },

  { path: "/community", element: <Community />, isPrivate: false },
  {
    path: "/community/category/:categoryId",
    element: <CategoryPage />,
    isPrivate: false,
  },
  {
    path: "/community/topic/:topicId",
    element: <TopicPage />,
    isPrivate: false,
  },
  {
    path: "/community/search",
    element: <SearchResultsPage />,
    isPrivate: false,
  },

  // Protected ones
  { path: "/account", element: <Profile />, isPrivate: true },
  { path: "/checkout", element: <Checkout />, isPrivate: true },
  { path: "/favorites", element: <Favorites />, isPrivate: true },
  {
    path: "/community/category/:categoryId/new",
    element: <CreateTopicPage />,
    isPrivate: true,
  },
  {
    path: "/community/followed",
    element: <FollowedTopicsPage />,
    isPrivate: true,
  },

  // Adminnnnnn
  {
    path: "/community/new-category",
    element: <NewCategoryPage />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/admin/moderation",
    element: <ModerationDashboard />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/community/new-topic",
    element: <AdminNewTopicPage />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/community/category/:categoryId/admin-new",
    element: <AdminNewTopicPage />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/community/category/:categoryId/edit",
    element: <EditCategoryPage />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/admin/items/new",
    element: <AdminNewItem />,
    isPrivate: true,
    isAdmin: true,
  },

  // 404 
  { path: "*", element: <NotFound />, isPrivate: false },
];

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {routes.map((route) => {
                  let element = route.element;

                  if (route.isPrivate && route.isAdmin) {
                    element = <AdminRoute>{element}</AdminRoute>;
                  } else if (route.isPrivate) {
                    element = <ProtectedRoute>{element}</ProtectedRoute>;
                  }

                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={element}
                    />
                  );
                })}
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
