import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useShop } from "../context/ShopContext";
import { COLOR_FAMILIES, formatPrice } from "../api/products";

export function ProductCard({ item, onOpen }) {
  const { addToCart, toggleWish, wishlist } = useShop();
  const [imgFailed, setImgFailed] = useState(false);

  const saved = wishlist.some((w) => w.key === item.key);
  const product = {
    key: item.key,
    name: item.name,
    image: item.image,
    price: item.priceNum,
    category: item.category,
  };

  const openDialog = () => {
    if (onOpen) onOpen(item);
  };

  return (
    <div className="group cursor-pointer" onClick={openDialog} onKeyDown={(e) => {
      if ((e.key === "Enter" || e.key === " ") && !e.defaultPrevented) {
        e.preventDefault();
        openDialog();
      }
    }} role="button" tabIndex={0} aria-label={`Open ${item.name} details`}>
      <div
        className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden"
        style={{ backgroundColor: COLOR_FAMILIES[item.colorFamily]?.hex || "#F4E8F1" }}
      >
        {!imgFailed && (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWish(product);
          }}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
            saved ? "bg-white text-[#D4537E]" : "bg-white/80 text-[hsl(var(--pum-taupe))] hover:bg-white"
          }`}
        >
          {saved ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="absolute left-3 right-3 bottom-3 py-2.5 rounded-full bg-[#FDF5FB]/95 text-[hsl(var(--pum-green))] text-[10px] font-bold uppercase tracking-[0.18em] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 transition-all duration-300 hover:bg-[#E8F3EC]"
        >
          Add to bag
        </button>
      </div>

      <div className="pt-4 px-1">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[hsl(var(--pum-green))] font-bold mb-1">
          {item.type}
        </p>
        <h3 className="font-serif text-lg leading-snug text-[hsl(var(--pum-taupe))]">{item.name}</h3>
        <p className="text-sm font-bold text-[hsl(var(--pum-taupe)/60)] mt-1">{formatPrice(item.priceNum)}</p>
      </div>
    </div>
  );
}