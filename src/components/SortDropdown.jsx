import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export function SortDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = options.find((o) => o.id === value);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative w-full sm:w-60">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`h-11 w-full flex items-center justify-between gap-3 rounded-full bg-white border px-5 text-sm text-[hsl(var(--pum-taupe))] transition-colors ${
          open ? "border-[hsl(var(--pum-green))]" : "border-[hsl(var(--pum-taupe)/15)] hover:border-[hsl(var(--pum-taupe)/40)]"
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="text-[hsl(var(--pum-taupe)/50)]">Sort</span>
          <span>{current?.label}</span>
        </span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        role="listbox"
        className={`absolute right-0 top-full mt-2 w-full sm:w-64 z-40 bg-white rounded-2xl border border-[hsl(var(--pum-taupe)/10)] shadow-[0_12px_40px_rgba(107,72,102,0.15)] p-2 transition-all duration-200 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {options.map((o) => {
          const selected = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => {
                onChange(o.id);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-left transition-colors ${
                selected
                  ? "bg-[#E8F3EC] text-[hsl(var(--pum-green))]"
                  : "text-[hsl(var(--pum-taupe))] hover:bg-[#FDF5FB]"
              }`}
            >
              {o.label}
              {selected && <Check size={15} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}