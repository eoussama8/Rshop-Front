// ─── Navigation ───────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",    href: "#", active: true },
  { label: "New In",  href: "#" },
  { label: "Deals",   href: "#" },
  { label: "About",   href: "#" },
];

export const CATEGORIES = [
  { label: "Electronics",   icon: "💻", bg: "rgba(77,163,255,0.13)",  href: "#" },
  { label: "Fashion",       icon: "👗", bg: "rgba(231,111,46,0.13)",  href: "#" },
  { label: "Home & Living", icon: "🏠", bg: "rgba(77,200,130,0.12)",  href: "#" },
  { label: "Sports",        icon: "⚽", bg: "rgba(255,200,50,0.12)",  href: "#" },
  { label: "Beauty",        icon: "💄", bg: "rgba(255,100,150,0.12)", href: "#" },
];

// ─── Hero ─────────────────────────────────────────────────
export const HERO_CHIPS = [
  "📦 Surprise Boxes",
  "⚡ Flash Sales",
  "🎮 Gaming",
  "👟 Sneakers",
  "🏠 Decor",
  "📱 Tech",
  "🌿 Wellness",
];

export const HERO_STATS = [
  { number: "12", suffix: "k+", label: "Products" },
  { number: "98", suffix: "%",  label: "Happy Buyers" },
  { number: "50", suffix: "+",  label: "Categories" },
  { number: "24", suffix: "/7", label: "Support" },
];

// ─── Products ─────────────────────────────────────────────
export const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    emoji: "🎧",
    bg: "#EEF4FF",
    price: "$49",
    oldPrice: "$89",
    badge: true,
  },
  {
    id: 2,
    name: "Street Sneakers",
    category: "Fashion",
    emoji: "👟",
    bg: "#FFF4EE",
    price: "$79",
    oldPrice: null,
    badge: false,
  },
  {
    id: 3,
    name: "Smart LED Lamp",
    category: "Home & Living",
    emoji: "💡",
    bg: "#F0FDF4",
    price: "$29",
    oldPrice: "$45",
    badge: true,
  },
  {
    id: 4,
    name: "Gaming Pad Elite",
    category: "Gaming",
    emoji: "🎮",
    bg: "#F5F3FF",
    price: "$35",
    oldPrice: null,
    badge: false,
  },
];
