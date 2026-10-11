import { Link } from "react-router-dom";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useShop } from "../context/ShopContext";

const linkCls =
  "text-[11px] font-bold tracking-[0.2em] uppercase text-[hsl(var(--pum-taupe))] hover:opacity-70 transition-opacity";

function Badge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[hsl(var(--pum-green))] text-white text-[9px] font-bold flex items-center justify-center">
      {count}
    </span>
  );
}

export const Navbar = () => {
  const { cartCount, wishlist, setDrawer } = useShop();

  return (
    <nav className="fixed top-6 left-6 right-6 z-50">
      <div className="mx-auto max-w-7xl px-8 h-16 bg-[hsl(var(--pum-pearl))/0.8] backdrop-blur-md border border-[hsl(var(--pum-lavender))] rounded-[2rem] shadow-sm flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="Hero/logoPeony.png" alt="Pum Logo" className="w-8 h-8 object-contain" />
          <h1 className="font-serif italic text-2xl text-[hsl(var(--pum-taupe))] leading-none">Pum</h1>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkCls}>Home</Link>
          <Link to="/shop" className={linkCls}>All Products</Link>
          <Link to="/#services" className={linkCls}>Services</Link>
          <Link to="/#contact" className={linkCls}>Contact Us</Link>
        </div>

        <div className="flex items-center gap-6 text-[hsl(var(--pum-taupe))]">
          <button onClick={() => setDrawer("wishlist")} aria-label="Wishlist" className="relative hover:opacity-70 transition-opacity">
            <FaRegHeart className="text-lg" />
            <Badge count={wishlist.length} />
          </button>
          <button onClick={() => setDrawer("cart")} aria-label="Shopping Cart" className="relative hover:opacity-70 transition-opacity">
            <FaShoppingCart className="text-lg" />
            <Badge count={cartCount} />
          </button>
        </div>
      </div>
    </nav>
  );
};