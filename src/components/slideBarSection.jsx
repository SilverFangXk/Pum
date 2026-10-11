import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { getProducts, COLOR_FAMILIES, formatPrice } from "../api/products";

const CARD = 220;  // card width in px
const GAP = 20;    // space between cards in px
const MAX = 20;    // how many bouquets to show
const SPEED = 30;  // auto-scroll speed in px per second

export function SlideBarSection() {
  const sliderRef = useRef(null);
  const [featured, setFeatured] = useState([]);

  const pausedRef = useRef(false);   // true while hovering / touching
  const resumeAtRef = useRef(0);     // timestamp when auto-scroll may resume
  const posRef = useRef(0);          // float scroll position (scrollLeft can round)

  // Round-robin through the species so neighbors differ
  useEffect(() => {
    getProducts("flowers")
      .then((data) => {
        const groups = {};
        data.forEach((p) => (groups[p.type] ||= []).push(p));
        const lists = Object.values(groups);

        const picks = [];
        for (let round = 0; picks.length < MAX; round++) {
          let added = false;
          for (const list of lists) {
            if (list[round] && picks.length < MAX) {
              picks.push(list[round]);
              added = true;
            }
          }
          if (!added) break;
        }
        setFeatured(picks);
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  // Auto-scroll: the list is rendered twice, so when we pass the end of the
  // first copy we jump back by one copy's width and nobody sees the seam.
  useEffect(() => {
    const el = sliderRef.current;
    if (!el || featured.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf;
    let last = performance.now();
    posRef.current = el.scrollLeft;

    const tick = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;

      if (pausedRef.current || now < resumeAtRef.current) {
        posRef.current = el.scrollLeft; // follow the user's own scrolling
      } else {
        const setWidth = (el.scrollWidth + GAP) / 2;
        let next = posRef.current + (SPEED * dt) / 1000;
        if (next >= setWidth) next -= setWidth;
        posRef.current = next;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [featured.length]);

  const holdAutoScroll = (ms) => {
    resumeAtRef.current = performance.now() + ms;
  };

  const scroll = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    const setWidth = (el.scrollWidth + GAP) / 2;
    const amount = (CARD + GAP) * 2;
    holdAutoScroll(1500);
    // Going left from the very start: jump silently one copy ahead first
    if (dir < 0 && el.scrollLeft < amount) el.scrollLeft += setWidth;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const arrowCls =
    "p-3.5 rounded-full border border-[hsl(var(--pum-taupe)/20)] text-[hsl(var(--pum-taupe))] hover:bg-[hsl(var(--pum-green))] hover:text-white hover:border-[hsl(var(--pum-green))] transition-all";

  // Two identical copies for the seamless loop
  const looped = [0, 1].flatMap((copy) => featured.map((p) => ({ p, copy })));

  return (
    <section className="py-28 px-16 bg-[hsl(var(--pum-pearl))] overflow-hidden relative">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-12 mb-12 flex justify-between items-end">
        <div className="space-y-4">
          <h2 className="font-serif text-6xl italic text-[hsl(var(--pum-taupe))]">Our Flowers.</h2>
          <div className="flex items-center gap-2 text-[hsl(var(--pum-green))]">
            <Sparkles size={14} />
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold">
              {featured.length ? `${featured.length} signature bouquets` : "\u00A0"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[hsl(var(--pum-green))] border-b border-[hsl(var(--pum-green))] pb-1 hover:opacity-70 transition-opacity"
          >
            View all <ArrowRight size={14} />
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => scroll(-1)} aria-label="Previous" className={arrowCls}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} aria-label="Next" className={arrowCls}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* SLIDER (full width, like the Services section) */}
      <div
        ref={sliderRef}
        style={{ gap: GAP }}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onTouchEnd={() => {
          pausedRef.current = false;
          holdAutoScroll(2000);
        }}
        onWheel={() => holdAutoScroll(1500)}
        className="flex overflow-x-auto scrollbar-hide pb-4"
      >
        {looped.map(({ p, copy }) => (
          <Link
            key={`${p.key}-${copy}`}
            to={`/shop?type=${encodeURIComponent(p.type)}`}
            style={{ minWidth: CARD, width: CARD }}
            className="group shrink-0"
            aria-hidden={copy === 1}
            tabIndex={copy === 1 ? -1 : 0}
          >
            <div
              className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-lg"
              style={{ backgroundColor: COLOR_FAMILIES[p.colorFamily]?.hex || "#F4E8F1" }}
            >
              <img
                src={p.image}
                alt={copy === 1 ? "" : p.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 px-3 py-1.5 bg-white/70 backdrop-blur-md text-[hsl(var(--pum-taupe))] text-[8px] uppercase tracking-[0.2em] font-bold rounded-full">
                {p.type}
              </span>
            </div>

            <div className="pt-4 px-1 space-y-1.5">
              <h4 className="text-lg font-serif italic text-[hsl(var(--pum-taupe))] leading-snug">{p.name}</h4>
              <div className="flex items-center gap-2 text-xs text-[hsl(var(--pum-taupe)/60)]">
                <span
                  className="w-3 h-3 rounded-full border border-[hsl(var(--pum-taupe)/25)]"
                  style={{ backgroundColor: COLOR_FAMILIES[p.colorFamily]?.hex }}
                />
                {p.color} · {p.size}
              </div>
              <p className="text-[13px] font-black text-[hsl(var(--pum-green))] tracking-[0.12em]">
                {formatPrice(p.priceNum)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}