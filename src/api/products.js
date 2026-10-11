export const CATEGORIES = [
  { id: "flowers", label: "Flower Bouquets", file: "/flowers.json" },
  { id: "vases", label: "Vases", file: "/vases.json" },
  { id: "homeDecoration", label: "Home Decor", file: "/homeDecoration.json" },
];

export const COLOR_FAMILIES = {
  pink: { label: "Pink", hex: "#F4C0D1" },
  white: { label: "White & cream", hex: "#F1EDE6" },
  red: { label: "Red", hex: "#E59A9A" },
  yellow: { label: "Yellow", hex: "#F2DE9A" },
  lavender: { label: "Lavender", hex: "#D5CDF0" },
  green: { label: "Green", hex: "#C3DDCB" },
  blue: { label: "Blue", hex: "#BCD6F2" },
  terracotta: { label: "Terracotta & orange", hex: "#E0AE95" },
  brown: { label: "Brown", hex: "#C9A98C" },
  gray: { label: "Gray", hex: "#D3D1CB" },
  black: { label: "Black", hex: "#4A4547" },
};

// Order matters: first match wins ("Dusty Rose" -> pink)
const FAMILY_RULES = [
  ["pink", /pink|blush|rose/],
  ["white", /white|ivory|cream|pearl/],
  ["red", /red/],
  ["yellow", /yellow|gold/],
  ["lavender", /lavender|lilac|purple/],
  ["green", /green|sage/],
  ["blue", /blue|cobalt/],
  ["terracotta", /terracotta|orange/],
  ["brown", /brown/],
  ["gray", /gr[ae]y/],
  ["black", /black/],
];

export const colorFamily = (color = "") => {
  const s = color.toLowerCase();
  return FAMILY_RULES.find(([, re]) => re.test(s))?.[0] ?? "other";
};

export const parsePrice = (p) => Number(String(p).replace(/[^\d]/g, ""));
export const formatPrice = (n) => `₩${Math.round(n).toLocaleString("en-US")}`;

const normalize = (item, category) => ({
  ...item,
  category,
  key: `${category}-${item.id}`,
  priceNum: parsePrice(item.price),
  colorFamily: colorFamily(item.color),
  searchText: [item.name, item.type, item.color, colorFamily(item.color), item.style, item.material, item.shape]
    .filter(Boolean)
    .join(" ")
    .toLowerCase(),
});

const cache = new Map();

// TODO (database task): replace the fetch below with
// fetch(`/api/products?category=${category}`) — nothing else changes.
export async function getProducts(category) {
  if (cache.has(category)) return cache.get(category);
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) throw new Error(`Unknown category: ${category}`);
  const res = await fetch(cat.file);
  if (!res.ok) throw new Error("Failed to load products");
  const data = (await res.json()).map((item) => normalize(item, category));
  cache.set(category, data);
  return data;
}