import { createContext, useContext, useEffect, useState } from "react";

const ShopContext = createContext(null);
export const useShop = () => useContext(ShopContext);

const load = (k) => {
  try {
    return JSON.parse(localStorage.getItem(k)) || [];
  } catch {
    return [];
  }
};

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => load("pum-cart"));
  const [wishlist, setWishlist] = useState(() => load("pum-wishlist"));
  const [drawer, setDrawer] = useState(null); // "cart" | "wishlist" | null

  useEffect(() => localStorage.setItem("pum-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("pum-wishlist", JSON.stringify(wishlist)), [wishlist]);

  // item: { key, name, image, price (number), category }
  const addToCart = (item) => {
    setCart((c) =>
      c.some((x) => x.key === item.key)
        ? c.map((x) => (x.key === item.key ? { ...x, qty: x.qty + 1 } : x))
        : [...c, { ...item, qty: 1 }]
    );
    setDrawer("cart");
  };

  const setQty = (key, qty) =>
    setCart((c) =>
      qty <= 0 ? c.filter((x) => x.key !== key) : c.map((x) => (x.key === key ? { ...x, qty } : x))
    );

  const toggleWish = (item) =>
    setWishlist((w) =>
      w.some((x) => x.key === item.key) ? w.filter((x) => x.key !== item.key) : [...w, item]
    );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <ShopContext.Provider
      value={{ cart, wishlist, drawer, setDrawer, addToCart, setQty, toggleWish, cartCount, subtotal }}
    >
      {children}
    </ShopContext.Provider>
  );
}