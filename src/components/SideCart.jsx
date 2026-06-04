import { PiXBold, PiHandbagLight } from 'react-icons/pi';

export function SideCart({ isOpen, onClose }) {

  const cartItems = []; // empty state (no items)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[hsl(var(--pum-taupe)/20)] backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-md
        bg-[#FDF5FB]
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        z-50 transform transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        p-10 flex flex-col
      `}>

        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--pum-taupe)/60)]">
              Your selection
            </p>

            <h2 className="font-serif italic text-xl flex items-center gap-2 text-[hsl(var(--pum-taupe))]">
              Shopping Bag
              <PiHandbagLight Size={18} className="opacity-70" />
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-[hsl(var(--pum-taupe))] hover:rotate-90 transition-transform duration-500"
          >
            <PiXBold Size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4 text-[hsl(var(--pum-taupe)/60)]">

          <PiHandbagLight Size={34} className="opacity-30" />

          <p className="text-sm font-serif italic text-[hsl(var(--pum-taupe))]">
            Your bag is empty
          </p>

          <p className="text-xs max-w-[220px] leading-relaxed">
            Add arrangements you love — we’ll keep them here until you're ready.
          </p>

          <button
            onClick={onClose}
            className="
              mt-4 text-xs uppercase tracking-[0.2em]
              border-b border-[hsl(var(--pum-taupe)/40)]
              hover:border-[hsl(var(--pum-taupe))]
              transition
            "
          >
            Continue browsing
          </button>

        </div>

      </div>
    </>
  );
}