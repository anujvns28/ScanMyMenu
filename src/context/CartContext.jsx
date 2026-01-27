import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product
  const addProductToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p._id === product._id && p.type === "product",
      );

      if (existing) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p,
        );
      }

      return [...prev, { ...product, qty: 1, type: "product" }];
    });
  };

  const addOfferToCart = (offer) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p._id === offer._id && p.type === "offer",
      );

      if (existing) {
        return prev.map((p) =>
          p._id === offer._id ? { ...p, qty: p.qty + 1 } : p,
        );
      }

      return [
        ...prev,
        {
          _id: offer._id,
          title: offer.title,
          offerPrice: offer.offerPrice,
          image: offer.image,
          qty: 1,
          type: "offer",
          items: offer.items.map((i) => ({
            productId: i.product._id,
            name: i.product.name,
            qty: i.quantity,
            image: i.product.image,
          })),
        },
      ];
    });
  };

  // Increase qty
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((p) => (p._id === id ? { ...p, qty: p.qty + 1 } : p)),
    );
  };

  // Decrease qty
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((p) => (p._id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0),
    );
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => {
    if (i.type === "offer") {
      return s + i.qty * i.offerPrice;
    }
    return s + i.qty * i.price;
  }, 0);

  const isCartOpen = totalItems > 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addProductToCart,
        addOfferToCart,
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
