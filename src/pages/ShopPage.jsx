import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Navbar } from "../components/NavbarSection";
import { ProductCard } from "../components/ProductCard";
import { SortDropdown } from "../components/SortDropdown";
import { getProducts, CATEGORIES, COLOR_FAMILIES } from "../api/products";
import { ProductDialog } from "../components/ProductDialog";
const PAGE_SIZE = 12;

const SORTS = {
  featured: { label: "Featured", fn: null },
  "price-asc": { label: "Price: low to high", fn: (a, b) => a.priceNum - b.priceNum },
  "price-desc": { label: "Price: high to low", fn: (a, b) => b.priceNum - a.priceNum },
  name: { label: "Name A–Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

export function ShopPage() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("category");
  const category = CATEGORIES.some((c) => c.id === requested) ? requested : "flowers";

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [query, setQuery] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState(null);

  // Load products whenever the category changes
  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setQuery("");
    setColor("");
    setType("");
    setVisible(PAGE_SIZE);
    getProducts(category)
      .then((data) => {
        if (!cancelled) {
          // Arriving from a home slider card (/shop?type=Tulip): preselect that species
          const wanted = params.get("type");
          setType(data.some((p) => p.type === wanted) ? wanted : "");
          setProducts(data);
          setStatus("ready");
        }
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Back to the first page whenever the filters change
  useEffect(() => setVisible(PAGE_SIZE), [query, color, type, sort]);

  // Filter options come from the data, so new types/colors appear automatically
  const colors = useMemo(
    () => [...new Set(products.map((p) => p.colorFamily))].filter((f) => COLOR_FAMILIES[f]),
    [products]
  );
  const types = useMemo(() => [...new Set(products.map((p) => p.type))].sort(), [products]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (!color || p.colorFamily === color) &&
        (!type || p.type === type) &&
        (!q || p.searchText.includes(q))
    );
    const fn = SORTS[sort].fn;
    return fn ? [...list].sort(fn) : list;
  }, [products, query, color, type, sort]);

  const hasFilters = Boolean(query || color || type);
  const clearAll = () => {
    setQuery("");
    setColor("");
    setType("");
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--pum-pearl))]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 pt-36">
        {/* Header + category tabs */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <h1 className="font-serif italic text-5xl md:text-6xl text-[hsl(var(--pum-taupe))]">All Products.</h1>
            <p className="text-sm text-[hsl(var(--pum-taupe)/60)] mt-3">
              {status === "ready"
                ? hasFilters
                  ? `${results.length} of ${products.length} products`
                  : `${products.length} products`
                : "\u00A0"}
            </p>
          </div>

          <div className="flex gap-8">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setParams(c.id === "flowers" ? {} : { category: c.id })}
                className={`pb-1.5 text-[11px] uppercase tracking-[0.2em] border-b-2 transition-colors ${
                  category === c.id
                    ? "text-[hsl(var(--pum-green))] border-[hsl(var(--pum-green))]"
                    : "text-[hsl(var(--pum-taupe)/50)] border-transparent hover:text-[hsl(var(--pum-taupe))]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sticky toolbar */}
        <div className="sticky top-24 z-30 bg-[hsl(var(--pum-pearl))] py-4 border-b border-[hsl(var(--pum-taupe)/10)] space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex-1 flex items-center gap-3 bg-white rounded-full border border-[hsl(var(--pum-taupe)/15)] px-5 h-11 focus-within:border-[hsl(var(--pum-green))] transition-colors">
              <Search size={16} className="text-[hsl(var(--pum-taupe)/50)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search peony, terracotta, wreath"
                aria-label="Search products"
                className="flex-1 bg-transparent outline-none text-sm text-[hsl(var(--pum-taupe))] placeholder:text-[hsl(var(--pum-taupe)/40)]"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search">
                  <X size={16} className="text-[hsl(var(--pum-taupe)/50)]" />
                </button>
              )}
            </label>

            <SortDropdown
              value={sort}
              onChange={setSort}
              options={Object.entries(SORTS).map(([id, s]) => ({ id, label: s.label }))}
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="text-xs text-[hsl(var(--pum-taupe)/60)]">Color</span>
            <div className="flex gap-2.5">
              {colors.map((f) => (
                <button
                  key={f}
                  onClick={() => setColor(color === f ? "" : f)}
                  title={COLOR_FAMILIES[f].label}
                  aria-label={COLOR_FAMILIES[f].label}
                  aria-pressed={color === f}
                  style={{ backgroundColor: COLOR_FAMILIES[f].hex }}
                  className={`w-6 h-6 rounded-full border border-[hsl(var(--pum-taupe)/25)] transition-all ${
                    color === f ? "ring-2 ring-offset-2 ring-[hsl(var(--pum-green))]" : "hover:scale-110"
                  }`}
                />
              ))}
            </div>

            <span className="hidden sm:block w-px h-5 bg-[hsl(var(--pum-taupe)/15)]" />

            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(type === t ? "" : t)}
                  aria-pressed={type === t}
                  className={`px-4 py-1.5 rounded-full text-xs border transition-all ${
                    type === t
                      ? "bg-[hsl(var(--pum-green)/0.1)] border-[hsl(var(--pum-green))] text-[hsl(var(--pum-green))]"
                      : "bg-white border-[hsl(var(--pum-taupe)/15)] text-[hsl(var(--pum-taupe))] hover:border-[hsl(var(--pum-taupe)/40)]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {hasFilters && (
              <button
                onClick={clearAll}
                className="ml-auto text-xs uppercase tracking-[0.15em] border-b border-[hsl(var(--pum-taupe)/40)] text-[hsl(var(--pum-taupe))] hover:border-[hsl(var(--pum-taupe))]"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <main className="pt-10 pb-24">
          {status === "error" ? (
            <div className="text-center py-24">
              <p className="font-serif italic text-2xl text-[hsl(var(--pum-taupe))]">Couldn't load the collection</p>
              <p className="text-sm text-[hsl(var(--pum-taupe)/60)] mt-2">Check your connection and refresh the page.</p>
            </div>
          ) : status === "loading" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] rounded-[1.5rem] bg-[#F4E8F1]" />
                  <div className="h-3 w-16 bg-[#F4E8F1] rounded mt-4" />
                  <div className="h-4 w-3/4 bg-[#F4E8F1] rounded mt-3" />
                  <div className="h-3 w-1/3 bg-[#F4E8F1] rounded mt-3" />
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-24 space-y-3">
              <p className="font-serif italic text-2xl text-[hsl(var(--pum-taupe))]">Nothing matches yet</p>
              <p className="text-sm text-[hsl(var(--pum-taupe)/60)]">Try another color or clear your filters.</p>
              <button
                onClick={clearAll}
                className="mt-2 text-xs uppercase tracking-[0.2em] border-b border-[hsl(var(--pum-taupe)/40)] hover:border-[hsl(var(--pum-taupe))]"
              >
                Clear all
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                {results.slice(0, visible).map((item) => (
                  <ProductCard key={item.key} item={item} onOpen={setSelected} />
                ))}
              </div>

              {visible < results.length && (
                <button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="block mx-auto mt-16 px-10 py-3 rounded-full border border-[hsl(var(--pum-green))] text-[hsl(var(--pum-green))] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[hsl(var(--pum-green))] hover:text-white transition-all"
                >
                  Load more
                </button>
              )}
            </>
          )}
        </main>
      </div>
      {selected && (
  <ProductDialog
    product={selected}
    onClose={() => setSelected(null)}
    onSelect={setSelected}
  />
)}
    </div>
  );
}