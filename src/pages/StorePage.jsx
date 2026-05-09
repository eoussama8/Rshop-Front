import { useState, useRef } from "react";
import Navbar from "../components/navbar/Navbar";
import ProductCard from "../components/ui/ProductCard";
import '../styles/StorePage.css';
import { useNavigate } from "react-router-dom";

const products = [
  { id:1,  name:"Wireless Noise-Cancelling Headphones", category:"Electronics", emoji:"🎧", bg:"#E8EEF8", price:"$129.99", oldPrice:"$179.99", badge:true  },
  { id:2,  name:"Minimalist Leather Wallet",            category:"Accessories", emoji:"👜", bg:"#F5EFE6", price:"$49.99",  oldPrice:null,       badge:false },
  { id:3,  name:"Stainless Steel Water Bottle",         category:"Home",        emoji:"🍶", bg:"#E6F4F1", price:"$34.99",  oldPrice:"$44.99",   badge:false },
  { id:4,  name:"Organic Cotton Hoodie",                category:"Fashion",     emoji:"👕", bg:"#F0EFF5", price:"$79.99",  oldPrice:null,       badge:true  },
  { id:5,  name:"Portable Bluetooth Speaker",           category:"Electronics", emoji:"🔊", bg:"#EEF1F8", price:"$89.99",  oldPrice:"$110.00",  badge:false },
  { id:6,  name:"Ceramic Pour-Over Coffee Set",         category:"Home",        emoji:"☕", bg:"#F6EDE3", price:"$64.99",  oldPrice:null,       badge:true  },
  { id:7,  name:"Vegan Leather Crossbody Bag",          category:"Accessories", emoji:"👝", bg:"#F5EDE6", price:"$99.99",  oldPrice:"$130.00",  badge:false },
  { id:8,  name:"Merino Wool Beanie",                   category:"Fashion",     emoji:"🧢", bg:"#EAF0F5", price:"$29.99",  oldPrice:null,       badge:false },
  { id:9,  name:"Bamboo Cutting Board Set",             category:"Home",        emoji:"🪵", bg:"#F2EDE6", price:"$44.99",  oldPrice:"$59.99",   badge:false },
  { id:10, name:"Smart LED Desk Lamp",                  category:"Electronics", emoji:"💡", bg:"#FDFBE8", price:"$59.99",  oldPrice:null,       badge:true  },
  { id:11, name:"Running Shoes — Aero V2",              category:"Fashion",     emoji:"👟", bg:"#E8F5EC", price:"$119.99", oldPrice:"$149.99",  badge:false },
  { id:12, name:"Essential Oil Diffuser",               category:"Home",        emoji:"🕯️", bg:"#F5EEF8", price:"$39.99",  oldPrice:null,       badge:true  },
];

const categories = [
  { name: "All",         emoji: "🛍️" },
  { name: "Electronics", emoji: "⚡" },
  { name: "Fashion",     emoji: "👗" },
  { name: "Accessories", emoji: "💼" },
  { name: "Home",        emoji: "🏡" },
];

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low"];
const parsePrice  = str => parseFloat(str.replace(/[^0-9.]/g, ""));
const countByCategory = (name) =>
  name === "All" ? products.length : products.filter(p => p.category === name).length;

const AI_REPLIES = [
  "I'd recommend checking our Electronics section for the best deals!",
  "Our most popular item this week is the Wireless Headphones at $129.99.",
  "You can filter by category on the left sidebar to narrow things down.",
  "We have free shipping on orders over $50!",
  "The Ceramic Coffee Set is a customer favorite — great gift idea!",
];

function Toast({ message, visible }) {
  return <div className={`toast ${visible ? "toast-visible" : ""}`}>{message}</div>;
}

function AIAssistant() {
  const [open, setOpen]         = useState(false);
  const [input, setInput]       = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I can help you find products, compare prices, or answer questions. What are you looking for?" }
  ]);
  const msgsRef = useRef(null);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input.trim() }]);
    setInput("");
    setTimeout(() => {
      const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
      setMessages(prev => [...prev, { role: "ai", text: reply }]);
      if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }, 600);
  };

  return (
    <>
      {open && (
        <div className="ai-panel">
          <div className="ai-panel-header">
            <span className="ai-panel-icon">🤖</span>
            <span className="ai-panel-title">AI Shopping Assistant</span>
            <button className="ai-panel-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>
          <div className="ai-panel-msgs" ref={msgsRef}>
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ai-msg-${m.role}`}>{m.text}</div>
            ))}
          </div>
          <div className="ai-panel-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask me anything…"
              aria-label="Ask AI assistant"
            />
            <button onClick={send} aria-label="Send">➤</button>
          </div>
        </div>
      )}
      <button className="ai-fab" onClick={() => setOpen(o => !o)} aria-label="Open AI assistant">
        🤖
        <span className="ai-fab-pulse" />
      </button>
    </>
  );
}

export default function StorePage() {
  const navigate = useNavigate(); // ✅ moved inside component

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy,         setSortBy]         = useState("Featured");
  const [search,         setSearch]         = useState("");
  const [cart,           setCart]           = useState([]);
  const [sidebarOpen,    setSidebarOpen]    = useState(true);
  const [catOpen,        setCatOpen]        = useState(true);
  const [toastMsg,       setToastMsg]       = useState("");
  const [toastVisible,   setToastVisible]   = useState(false);
  const toastTimer = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2000);
  };

  const handleAddToCart = (product) => {
    setCart(prev => {
      const inCart = prev.find(p => p.id === product.id);
      showToast(inCart ? "Removed from cart" : "Added to cart!");
      return inCart ? prev.filter(p => p.id !== product.id) : [...prev, product];
    });
  };

  const handleDeals = () => {
    setActiveCategory("All");
    setSortBy("Price: Low to High");
    showToast("Showing best prices first!");
  };

  let filtered = products.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  if (sortBy === "Price: Low to High")
    filtered = [...filtered].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  else if (sortBy === "Price: High to Low")
    filtered = [...filtered].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

  return (
    <>
      <div className="store-layout">
        <aside className={`store-sidebar ${sidebarOpen ? "" : "collapsed"}`}>
          <div className="sidebar-top">
            <button className="toggle-btn" onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle sidebar">
              {sidebarOpen ? "←" : "→"}
            </button>
            {sidebarOpen && <span className="sidebar-title">Filters</span>}
          </div>

          {sidebarOpen && (
            <>
              <div className="sidebar-search">
                <div className="search-box">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search products…"
                    aria-label="Search products"
                  />
                </div>
              </div>

              <div className="sidebar-section">
                <button className="section-label-btn" onClick={() => setCatOpen(o => !o)} aria-expanded={catOpen}>
                  <span className="section-label">Categories</span>
                  <span className={`section-chevron ${catOpen ? "open" : ""}`}>▾</span>
                </button>
                {catOpen && (
                  <div className="cat-list">
                    {categories.map(({ name, emoji }) => (
                      <button
                        key={name}
                        className={`cat-item ${activeCategory === name ? "active" : ""}`}
                        onClick={() => setActiveCategory(name)}
                      >
                        <span className="cat-emoji">{emoji}</span>
                        <span className="cat-label">{name}</span>
                        <span className="cat-count">{countByCategory(name)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="sidebar-bottom">
            <button className="quick-btn wish-btn" onClick={() => showToast("Wishlist coming soon!")}>
              <span className="quick-icon">❤️</span>
              {sidebarOpen && <span className="quick-label">Wishlist</span>}
            </button>
            <button className="quick-btn deals-btn" onClick={handleDeals}>
              <span className="quick-icon">🏷️</span>
              {sidebarOpen && <span className="quick-label">Deals &amp; Sales</span>}
            </button>
            <button className="quick-btn recent-btn" onClick={() => showToast("No recently viewed yet")}>
              <span className="quick-icon">🕐</span>
              {sidebarOpen && <span className="quick-label">Recently Viewed</span>}
            </button>
          </div>
        </aside>

        <div className="store-main">
          <section className="store-hero">
            <div className="hero-inner">
              <div className="hero-eyebrow">
                <span className="hero-dot" />
                Spring Collection 2025
              </div>
              <h1 className="hero-h1">Shop <em>Everything</em> You Love</h1>
              <p className="hero-sub">
                Handpicked products across every category — from tech to fashion,
                home essentials to everyday accessories.
              </p>
              <div className="hero-row">
                <button className="btn-primary">Browse All</button>
                <button className="btn-ghost">View Deals →</button>
                <div className="hero-stats">
                  {[["2,400+","Products"],["98%","Satisfaction"],["Free","Shipping $50+"]].map(([n,l]) => (
                    <div key={l} className="stat-block">
                      <div className="stat-num">{n}</div>
                      <div className="stat-label">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="store-toolbar">
            <span className="count-label">{filtered.length} item{filtered.length !== 1 ? "s" : ""}</span>
            <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          <div className="product-scroll">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <p className="empty-title">No products found</p>
                <p className="empty-sub">Try a different search or category</p>
              </div>
            ) : (
              <div className="product-grid">
                {filtered.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    inCart={!!cart.find(p => p.id === product.id)}
                    onAddToCart={handleAddToCart}
                    onClick={() => navigate(`/store/${product.id}`)} // ✅ navigate here
                  />
                ))}
              </div>
            )}
          </div>

          <AIAssistant />
          <Toast message={toastMsg} visible={toastVisible} />
        </div>
      </div>
    </>
  );
}