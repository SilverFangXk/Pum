import { Sparkles, Heart } from "lucide-react";
import { PiXBold } from "react-icons/pi";
import { useShop } from "../context/ShopContext";
import { formatPrice } from "../api/products";

export function SideWishlist() {
  const { wishlist, drawer, setDrawer, toggleWish, addToCart } = useShop();
  const isOpen = drawer === "wishlist";
  const close = () => setDrawer(null);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-[hsl(var(--pum-taupe)/20)] backdrop-blur-sm z-40" onClick={close} />}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#FDF5FB] shadow-[0_20px_60px_rgba(0,0,0,0.08)] z-50 transform transition-transform duration-500 ease-in-out p-10 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-1">
            <h2 className="font-serif italic text-xl flex items-center gap-2 text-[hsl(var(--pum-taupe))]">
              Saved for later
              <Sparkles size={16} className="opacity-70" />
            </h2>
            <p className="text-xs tracking-wide text-[hsl(var(--pum-taupe)/60)]">Your selected arrangements</p>
          </div>
          <button onClick={close} aria-label="Close" className="text-[hsl(var(--pum-taupe))] hover:rotate-90 transition-transform duration-500">
            <PiXBold size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto pr-2">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-[hsl(var(--pum-taupe)/60)]">
              <Heart size={28} className="opacity-40" />
              <p className="text-sm font-serif italic">No saved arrangements yet</p>
              <p className="text-xs max-w-[220px]">Tap the heart on any bouquet to save ideas for later.</p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={item.key} className="flex gap-4 border-b border-[hsl(var(--pum-taupe)/10)] pb-6 mb-6">
                <img src={item.image} alt={item.name} className="w-20 h-24 rounded-2xl object-cover" />
                <div className="space-y-2">
                  <p className="font-serif text-[hsl(var(--pum-taupe))] leading-snug">{item.name}</p>
                  <p className="text-sm font-bold text-[hsl(var(--pum-taupe)/60)]">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => addToCart(item)} className="text-[10px] uppercase tracking-[0.15em] font-bold text-[hsl(var(--pum-green))] border-b border-[hsl(var(--pum-green))]">
                      Add to bag
                    </button>
                    <button onClick={() => toggleWish(item)} className="text-xs text-[hsl(var(--pum-taupe)/60)] hover:text-[hsl(var(--pum-taupe))] transition">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}