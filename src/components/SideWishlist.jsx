import { Sparkles, Heart } from "lucide-react";
import { PiXBold } from "react-icons/pi";

export function SideWishlist({ isOpen, onClose }) {
    const savedItems = JSON.parse(localStorage.getItem('pum-wishlist') || '[]');

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-[hsl(var(--pum-taupe)/20)] backdrop-blur-sm z-40"
                    onClick={onClose}
                />
            )}

            <div className={`
                fixed top-0 right-0 h-full w-full max-w-md 
                bg-[#FDF5FB] shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                z-50 transform transition-transform duration-500 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                p-10 flex flex-col
            `}>

                {/* Header */}
                <div className="flex justify-between items-start mb-10">
                    <div className="space-y-1">
                        <h2 className="font-serif italic text-xl flex items-center gap-2 text-[hsl(var(--pum-taupe))]">
                            Saved for later
                            <Sparkles Size={16} className="opacity-70" />
                        </h2>
                        <p className="text-xs tracking-wide text-[hsl(var(--pum-taupe)/60)]">
                            Your selected arrangements
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-[hsl(var(--pum-taupe))] hover:rotate-90 transition-transform duration-500"
                    >
                        <PiXBold Size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto pr-2">

                    {savedItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-[hsl(var(--pum-taupe)/60)]">
                            <Heart Size={28} className="opacity-40" />
                            <p className="text-sm font-serif italic">
                                No saved arrangements yet
                            </p>
                            <p className="text-xs max-w-[220px]">
                                Tap the heart on any bouquet to save ideas for later.
                            </p>
                        </div>
                    ) : (
                        savedItems.map(item => (
                            <div
                                key={item.id}
                                className="flex gap-5 border-b border-[hsl(var(--pum-taupe)/10)] pb-6 mb-6 hover:bg-white/30 rounded-xl p-2 transition"
                            >
                                <img
                                    src={item.image}
                                    className="w-20 h-20 rounded-2xl object-cover"
                                    alt={item.name}
                                />

                                <div className="space-y-1">
                                    <p className="font-serif italic text-[hsl(var(--pum-taupe))]">
                                        {item.name}
                                    </p>
                                    <p className="text-sm font-bold text-[hsl(var(--pum-taupe)/60)]">
                                        {item.price}
                                    </p>

                                    <button className="text-xs text-[hsl(var(--pum-taupe)/60)] hover:text-[hsl(var(--pum-taupe))] transition">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </>
    );
}