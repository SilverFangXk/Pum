import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import { SideCart } from "./components/SideCart";
import { SideWishlist } from "./components/SideWishlist";
import { ShopPage } from "./pages/ShopPage";
import Home from "./pages/Home";

// Scroll to top on page change, or to the #section when the link has one
function ScrollToHash() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [hash, pathname]);
  return null;
}

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
        <SideCart />
        <SideWishlist />
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;