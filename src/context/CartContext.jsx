import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === product._id);

      if (existing) {
        return prev.map((p) =>
          p._id === product._id
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Increase qty
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  // Decrease qty
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p._id === id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce(
    (s, i) => s + i.qty * i.price,
    0
  );

  const isCartOpen = totalItems > 0;


  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        increaseQty,
        decreaseQty,
        totalItems,
        totalPrice,
        isCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
