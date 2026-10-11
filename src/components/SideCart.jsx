import { PiXBold, PiHandbagLight } from "react-icons/pi";
import { Minus, Plus } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { formatPrice } from "../api/products";

export function SideCart() {
  const { cart, drawer, setDrawer, setQty, subtotal } = useShop();
  const isOpen = drawer === "cart";
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
            <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--pum-taupe)/60)]">Your selection</p>
            <h2 className="font-serif italic text-xl flex items-center gap-2 text-[hsl(var(--pum-taupe))]">
              Shopping Bag
              <PiHandbagLight size={18} className="opacity-70" />
            </h2>
          </div>
          <button onClick={close} aria-label="Close" className="text-[hsl(var(--pum-taupe))] hover:rotate-90 transition-transform duration-500">
            <PiXBold size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4 text-[hsl(var(--pum-taupe)/60)]">
            <PiHandbagLight size={34} className="opacity-30" />
            <p className="text-sm font-serif italic text-[hsl(var(--pum-taupe))]">Your bag is empty</p>
            <p className="text-xs max-w-[220px] leading-relaxed">Add arrangements you love — we’ll keep them here until you're ready.</p>
            <button onClick={close} className="mt-4 text-xs uppercase tracking-[0.2em] border-b border-[hsl(var(--pum-taupe)/40)] hover:border-[hsl(var(--pum-taupe))] transition">
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto pr-2 space-y-6">
              {cart.map((item) => (
                <div key={item.key} className="flex gap-4 border-b border-[hsl(var(--pum-taupe)/10)] pb-6">
                  <img src={item.image} alt={item.name} className="w-20 h-24 rounded-2xl object-cover" />
                  <div className="flex-1 space-y-2">
                    <p className="font-serif text-[hsl(var(--pum-taupe))] leading-snug">{item.name}</p>
                    <p className="text-sm font-bold text-[hsl(var(--pum-taupe)/60)]">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-[hsl(var(--pum-taupe)/15)] rounded-full bg-white">
                        <button onClick={() => setQty(item.key, item.qty - 1)} aria-label="Decrease" className="p-2">
                          <Minus size={12} />
                        </button>
                        <span className="text-xs w-6 text-center">{item.qty}</span>
                        <button onClick={() => setQty(item.key, item.qty + 1)} aria-label="Increase" className="p-2">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => setQty(item.key, 0)} className="text-xs text-[hsl(var(--pum-taupe)/60)] hover:text-[hsl(var(--pum-taupe))] transition">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 mt-2 border-t border-[hsl(var(--pum-taupe)/10)] space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--pum-taupe)/60)]">Subtotal</span>
                <span className="font-serif text-xl text-[hsl(var(--pum-taupe))]">{formatPrice(subtotal)}</span>
              </div>
              <button className="w-full py-3.5 bg-[hsl(var(--pum-green))] text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}