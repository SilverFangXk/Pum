import { Link } from "react-router-dom";

const IMG = "/Hero"; // files live in public/Hero/

/*
  Desktop grid (4 cols x 4 rows, rows = 3fr 7fr 7fr 3fr):

  [ empty ] [ hero6 ] [ hero  ] [ empty ]
  [ hero2 ] [ hero6 ] [ hero  ] [ hero3 ]
  [ hero2 ] [ hero4 ] [ hero5 ] [ hero3 ]
  [ empty ] [ hero4 ] [ hero5 ] [ empty ]

  Mobile: only the 4 middle images, 2x2.
*/
const tiles = [
  { src: "hero2.jpg", alt: "Artisan Bouquet", pos: "hidden md:block md:col-start-1 md:row-start-2 md:row-span-2", float: "animate-float-slow" },
  { src: "hero6.jpg", alt: "Floral Details",  pos: "col-start-1 row-start-1 md:col-start-2 md:row-span-2", float: "animate-float-delayed" },
  { src: "hero4.jpg", alt: "Floral Studio",   pos: "col-start-1 row-start-2 md:col-start-2 md:row-start-3 md:row-span-2", float: "" },
  { src: "hero.jpg",  alt: "Floral Details",  pos: "col-start-2 row-start-1 md:col-start-3 md:row-span-2", float: "animate-float-delayed" },
  { src: "hero5.jpg", alt: "Floral Studio",   pos: "col-start-2 row-start-2 md:col-start-3 md:row-start-3 md:row-span-2", float: "" },
  { src: "hero3.jpg", alt: "Artisan Bouquet", pos: "hidden md:block md:col-start-4 md:row-start-2 md:row-span-2", float: "animate-float-slow" },
];

export function HeroSection() {
  return (
    <section className="relative isolate w-full h-svh min-h-[640px] pt-20 px-4 bg-[hsl(var(--pum-pearl))] overflow-hidden flex items-center justify-center">

  {/* 1. The Hero Wall: 80% wide, 85% tall, centered */}
  <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-[3fr_7fr_7fr_3fr] gap-3 md:gap-4 w-full md:w-[80%] h-[85%] opacity-70">
        {tiles.map((t) => (
          <div
            key={t.src}
            className={`min-h-0 rounded-3xl overflow-hidden shadow-xl ${t.float} ${t.pos}`}
          >
            <img src={`${IMG}/${t.src}`} alt={t.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* 2. Floating Narrative Overlay */}
      <div className="absolute inset-0 pt-20 px-4 flex items-center justify-center pointer-events-none">
        <div className="bg-[hsl(var(--pum-taupe))/40] backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-white/20 shadow-2xl text-center max-w-2xl pointer-events-auto">
          <span className="text-[hsl(var(--pum-cream))] font-bold tracking-[0.3em] uppercase text-xs opacity-90 drop-shadow-md">
            Handcrafted in Seoul
          </span>

          <h1 className="text-5xl md:text-7xl font-serif text-white mt-6 mb-8 leading-[0.9] tracking-tighter drop-shadow-lg">
            Nature’s <br />
            <span className="italic opacity-90 text-[hsl(var(--pum-cream))]">finest poetry.</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/shop"
              className="px-8 py-4 bg-[hsl(var(--pum-cream))] text-[hsl(var(--pum-taupe))] rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-lg"
            >
              Shop Collections
            </Link>
            <a
              href="#contact"
              className="px-8 py-4 border border-[hsl(var(--pum-cream))/30] text-[hsl(var(--pum-cream))] rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all shadow-lg"
            >
              Book a Visit
            </a>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[hsl(var(--pum-lavender))] rounded-full blur-3xl opacity-50 -z-10" />
    </section>
  );
}