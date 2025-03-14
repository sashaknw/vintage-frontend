
import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  
  const addToCart = (item) => {
   
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );

   
    if (existingItemIndex > -1) {
      return; 
    }

   
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
      quantity: 1, 
    };

   
    setCartItems([...cartItems, cartItem]);
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };


  const cartItemCount = cartItems.length;

  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartItemCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
