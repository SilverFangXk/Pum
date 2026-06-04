import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser, FaRegHeart, FaShoppingCart } from 'react-icons/fa';

export const Navbar = ({ onOpenCart , onOpenWishlist }) => {
  return (
    <nav className="fixed top-6 left-6 right-6 z-50 ">
      <div className="mx-auto max-w-7xl px-8 h-16 bg-[hsl(var(--pum-pearl))/0.8] backdrop-blur-md border border-[hsl(var(--pum-lavender))] rounded-[2rem] shadow-sm flex items-center justify-between">

        {/* Section 1: Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img src="logoPeony.png" alt="Pum Logo" className="w-8 h-8 object-contain" />
          <h1 className="font-serif italic text-2xl text-[hsl(var(--pum-taupe))] leading-none">Pum</h1>
        </div>

        {/* Section 2: Navigation (Centered) */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-[11px] font-bold tracking-[0.2em] uppercase text-[hsl(var(--pum-taupe))] hover:opacity-70 transition-opacity">
            Home
          </a>
          <Link to="/shop" className="text-[11px] font-bold tracking-[0.2em] uppercase text-[hsl(var(--pum-taupe))] hover:opacity-70 transition-opacity"
            aria-haspopup="true">
            All Products
          </Link>

          <a href="#services" className="text-[11px] font-bold tracking-[0.2em] uppercase text-[hsl(var(--pum-taupe))] hover:opacity-70 transition-opacity">
            Services
          </a>
          <a href="#contact" className="text-[11px] font-bold tracking-[0.2em] uppercase text-[hsl(var(--pum-taupe))] hover:opacity-70 transition-opacity">
            Contact Us
          </a>
        </div>

        {/* Section 3: Actions */}
        <div className="flex items-center gap-6 text-[hsl(var(--pum-taupe))]">
          <button onClick={onOpenWishlist} aria-label="Wishlist" className="hover:opacity-70 transition-opacity">
            <FaRegHeart className="text-lg" />
          </button>
          <button onClick={onOpenCart} aria-label="Shopping Cart" className="hover:opacity-70 transition-opacity">
            <FaShoppingCart className="text-lg" />
          </button>
        </div>
      </div>
    </nav>
  );
};