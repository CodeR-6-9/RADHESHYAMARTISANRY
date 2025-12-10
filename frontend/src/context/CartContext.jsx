import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, color, size) => {
    const newItem = {
      ...product,
      selectedColor: color,
      selectedSize: size,
      uniqueId: Date.now(),
      quantity: 1, // 1. Start with 1
    };
    setCartItems([...cartItems, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (uniqueId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.uniqueId !== uniqueId)
    );
  };

  // 2. NEW: Update Quantity Function
  const updateQuantity = (uniqueId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent going below 1

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueId === uniqueId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 3. Updated Total Calculation
  const getCartTotal = () => {
    // Multiply price * quantity
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shipping = subtotal > 0 ? 5.0 : 0;
    const tax = subtotal * 0.08;
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity, // Export this
        getCartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
