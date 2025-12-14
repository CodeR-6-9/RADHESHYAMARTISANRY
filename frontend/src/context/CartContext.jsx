import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 1. IMPROVED: Add to Cart (Checks for duplicates)
  const addToCart = (product, color, size) => {
    setCartItems((prevItems) => {
      // Create a specific ID for this variation
      // e.g. "101-Red-M" or "102-Blue-null"
      const uniqueId = `${product.id}-${color}-${size || "default"}`;

      // Check if this specific item is already in the cart
      const existingItem = prevItems.find((item) => item.uniqueId === uniqueId);

      if (existingItem) {
        // If exists, just increase quantity
        return prevItems.map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new, add it
        return [
          ...prevItems,
          {
            ...product,
            uniqueId, // Use the smart ID
            selectedColor: color,
            selectedSize: size,
            quantity: 1,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (uniqueId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.uniqueId !== uniqueId)
    );
  };

  const updateQuantity = (uniqueId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueId === uniqueId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 2. NEW: Clear Cart (Needed for Checkout success)
  const clearCart = () => {
    setCartItems([]);
  };

  // 3. UPDATED: Total Calculation (Free Shipping + 0 Tax)
  const getCartTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // FIX: Hardcode these to 0 so the Checkout Total matches the Subtotal
    const shipping = 0;
    const tax = 0;

    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax,
    };
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart, // Exporting this so CheckoutPage can use it
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
