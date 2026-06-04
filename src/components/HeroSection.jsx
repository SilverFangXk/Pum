export function HeroSection() {
  return (
    <section className="relative w-full py-24 px-8 mt-24 bg-[hsl(var(--pum-pearl))] overflow-hidden">
      
      {/* 1. The Hero Wall */}
      <div className="grid grid-cols-4 gap-4 items-center opacity-70">
        <div className="aspect-[2/3] rounded-3xl overflow-hidden shadow-xl animate-float-slow">
          <img src="hero2.jpg" className="w-full h-full object-cover" alt="Artisan Bouquet" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-xl animate-float-delayed">
            <img src="hero6.jpg" className="w-full h-full object-cover" alt="Floral Details" />
          </div>
          <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
            <img src="hero4.jpg" className="w-full h-full object-cover" alt="Floral Studio" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-xl animate-float-delayed">
            <img src="hero.jpg" className="w-full h-full object-cover" alt="Floral Details" />
          </div>
          <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
            <img src="hero5.jpg" className="w-full h-full object-cover" alt="Floral Studio" />
          </div>
        </div>
        <div className="aspect-[2/3] rounded-3xl overflow-hidden shadow-xl animate-float-slow">
          <img src="hero3.jpg" className="w-full h-full object-cover" alt="Artisan Bouquet" />
        </div>
      </div>

      {/* 2. Floating Narrative Overlay (Brightened & Popping) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8">
        <div className="bg-[hsl(var(--pum-taupe))/40] backdrop-blur-xl p-12 rounded-[2rem] border border-white/20 shadow-2xl text-center max-w-2xl pointer-events-auto">
          {/* Lightened Label */}
          <span className="text-[hsl(var(--pum-cream))] font-bold tracking-[0.3em] uppercase text-xs opacity-90 drop-shadow-md">
            Handcrafted in Seoul
          </span>
          {/* Popping Header */}
          <h1 className="text-6xl md:text-7xl font-serif text-white mt-6 mb-8 leading-[0.9] tracking-tighter drop-shadow-lg">
            Nature’s <br />
            <span className="italic opacity-90 text-[hsl(var(--pum-cream))]">finest poetry.</span>
          </h1>
          {/* Brightened Buttons */}
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-[hsl(var(--pum-cream))] text-[hsl(var(--pum-taupe))] rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-lg">
              Shop Collections
            </button>
            <button className="px-8 py-4 border border-[hsl(var(--pum-cream))/30] text-[hsl(var(--pum-cream))] rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all shadow-lg">
              Book a Visit
            </button>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[hsl(var(--pum-lavender))] rounded-full blur-3xl opacity-50 -z-10" />
    </section>
  );
}