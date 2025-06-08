import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize from localStorage, or empty array if none
  const [selectedCabinsForCheckout, setSelectedCabinsForCheckout] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedCabinsForCheckout");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        "selectedCabinsForCheckout",
        JSON.stringify(selectedCabinsForCheckout)
      );
    } catch {
      // handle error if needed
    }
  }, [selectedCabinsForCheckout]);

  const addToCart = (cabin) => {
    setSelectedCabinsForCheckout((prev) => [...prev, cabin]);
    toast.success(`${cabin.name} added to cart!`, {
      duration: 2000,
      position: "top-center",
    });
  };

  const removeFromCart = (cabin) => {
    setSelectedCabinsForCheckout((prev) =>
      prev.filter((item) => item.id !== cabin.id)
    );
    toast.error(`${cabin.name} removed from cart!`, {
      duration: 2000,
      position: "top-center",
    });
  };

  const isInCart = (cabin) => {
    return selectedCabinsForCheckout.some((item) => item.id === cabin.id);
  };

  const clearCart = () => {
    setSelectedCabinsForCheckout([]);
  };

  return (
    <CartContext.Provider
      value={{ selectedCabinsForCheckout, addToCart, removeFromCart, isInCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
