"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    const isItemInside = cart.some((itemCart) => itemCart.id === item.id);
    if (isItemInside) {
      setCart((currCart) =>
        currCart.map((itemCart) =>
          itemCart.id === item.id
            ? { ...itemCart, quantity: itemCart.quantity + 1 }
            : itemCart
        )
      );
    } else {
      setCart((currCart) => [...currCart, { ...item, note: "" }]);
    }
  };
  const updateNote = (itemId, newNote) => {
    setCart((currCart) =>
      currCart.map((item) =>
        item.id === itemId ? { ...item, note: newNote } : item
      )
    );
  };
  const removeItem = (item) => {
    setCart((currCart) =>
      currCart.filter((currItem) => currItem.id !== item.id)
    );
  };
  const updateQuantity = (item, type) => {
    if (type === "min" && item.quantity === 1) {
      removeItem(item);
      return;
    }
    setCart((currCart) => {
      if (type === "plus") {
        return currCart.map((cart) =>
          item.id === cart.id ? { ...cart, quantity: cart.quantity + 1 } : cart
        );
      }

      if (type === "min") {
        return currCart.map((cart) =>
          item.id === cart.id ? { ...cart, quantity: cart.quantity - 1 } : cart
        );
      }

      removeItem(item);
    });
  };
  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        updateNote,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
