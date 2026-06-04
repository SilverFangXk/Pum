import { useRef, useEffect, useState } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export function SlideBarSection() {
    const sliderRef = useRef(null);
    const [flowers, setFlowers] = useState([]);

    // Load data
    useEffect(() => {
        fetch("/flowers.json")
            .then(res => res.json())
            .then(data => setFlowers(data.slice(0, 13)))
            .catch(err => console.error("Fetch Error:", err));
    }, []);

    // duplicate for infinite loop
    const loopedFlowers = [...flowers, ...flowers];

    const scroll = (direction) => {
        const container = sliderRef.current;
        if (!container) return;

        const scrollAmount = 410;
        const singleSetWidth = container.scrollWidth / 2;

        if (direction === "right") {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });

            setTimeout(() => {
                // when reaching second copy → reset to start (INSTANT, invisible)
                if (container.scrollLeft >= singleSetWidth) {
                    container.scrollLeft = 0;
                }
            }, 450);
        }

        if (direction === "left") {
            // if at start → jump silently to end of first set
            if (container.scrollLeft <= 0) {
                container.scrollLeft = singleSetWidth;
            }

            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="py-32 bg-[hsl(var(--pum-pearl))] overflow-hidden relative">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto px-12 mb-16 flex justify-between items-end">

                <div className="space-y-4">
                    <h2 className="font-serif text-6xl italic text-[hsl(var(--pum-taupe))]">
                        Our Flowers.
                    </h2>

                    <div className="flex items-center gap-2 text-[hsl(var(--pum-green))]">
                        <Sparkles size={14} />
                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold">
                            {flowers.length} Hand-Crafted Varieties
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => scroll("left")} className="p-4 rounded-full border border-[hsl(var(--pum-taupe))/20] hover:bg-[hsl(var(--pum-green))] hover:text-white transition-all">
                        <ChevronLeft size={20} />
                    </button>

                    <button onClick={() => scroll("right")} className="p-4 rounded-full border border-[hsl(var(--pum-taupe))/20] hover:bg-[hsl(var(--pum-green))] hover:text-white transition-all">
                        <ChevronRight size={20} />
                    </button>
                </div>

            </div>

            {/* SLIDER */}
            <div
                ref={sliderRef}
                className="flex gap-10 px-12 overflow-x-auto scrollbar-hide scroll-smooth"
            >
                {loopedFlowers.map((flower, i) => (
                    <div key={i} className="min-w-[400px] group space-y-8">

                        <div className="aspect-[4/5] bg-[hsl(var(--pum-mist))] rounded-[2.5rem] overflow-hidden relative shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">

                            <img
                                src={flower.image}
                                alt={flower.name}
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute top-8 left-8 z-10">
                                <span className="px-5 py-2.5 bg-[hsl(var(--pum-pink))]/40 backdrop-blur-xl border border-[hsl(var(--pum-taupe))/30] text-[hsl(var(--pum-taupe))] text-[10px] uppercase tracking-[0.3em] font-bold rounded-full">
                                    {flower.type}
                                </span>
                            </div>

                        </div>

                        <div className="space-y-3 px-2">
                            <h4 className="text-2xl font-serif italic text-[hsl(var(--pum-taupe))]">
                                {flower.name}
                            </h4>

                            <p className="text-[13px] text-[hsl(var(--pum-taupe))/70] leading-relaxed line-clamp-2 max-w-[320px]">
                                {flower.desc}
                            </p>

                            <p className="text-[14px] font-black text-[hsl(var(--pum-green))] tracking-[0.2em]">
                                {flower.price}
                            </p>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    );
}