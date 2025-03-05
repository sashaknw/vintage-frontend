// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  // State to store cart items
  const [cartItems, setCartItems] = useState(() => {
    // Initialize from localStorage if exists
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item, quantity = 1) => {
    // Create a comprehensive cart item with fallbacks
    const cartItem = {
      _id: item._id,
      name: item.name,
      price: item.price,
      size: item.size,
      images:
        item.images && item.images.length > 0
          ? item.images
          : ["https://via.placeholder.com/150"],
      category: item.category,
      brand: item.brand,
      quantity: quantity,
    };

    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItemIndex > -1) {
      // If item exists, update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, cartItem]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  // Update quantity of an item
  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId
        ? { ...item, quantity: Math.max(1, Math.min(newQuantity, 10)) }
        : item
    );
    setCartItems(updatedCart);
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total items in cart
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Provide context value
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
