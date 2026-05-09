import { useState, useEffect, useRef } from "react"; // ✅ added useRef
import { useNavigate, useParams } from "react-router-dom"; // ✅ combined import
import '../styles/ProductDetailPage.css';

// ✅ removed: const { id } = useParams() — was called outside component

const MOCK_PRODUCT = {
  product: {
    id: 1,
    category_id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Experience studio-quality sound with our flagship wireless headphones. Featuring 40mm drivers, adaptive noise cancellation, and a 30-hour battery life, these headphones are engineered for audiophiles who refuse to compromise.",
    brand: "SoundCore",
    is_active: true,
    created_at: "2025-01-15T10:00:00",
  },
  variants: [
    { id: 1, product_id: 1, color: "#1F2A44", size: null, sku: "WNC-NVY-OS", price: 12999, stock: 12, created_at: "2025-01-15T10:00:00" },
    { id: 2, product_id: 1, color: "#E76F2E", size: null, sku: "WNC-ORG-OS", price: 12999, stock: 5,  created_at: "2025-01-15T10:00:00" },
    { id: 3, product_id: 1, color: "#F5F7FA", size: null, sku: "WNC-WHT-OS", price: 14999, stock: 0,  created_at: "2025-01-15T10:00:00" },
    { id: 4, product_id: 1, color: "#222222", size: null, sku: "WNC-BLK-OS", price: 12999, stock: 20, created_at: "2025-01-15T10:00:00" },
  ],
  images: [
    { id: 1, product_id: 1, variant_id: null, image_url: null, is_main: true,  created_at: "2025-01-15T10:00:00" },
    { id: 2, product_id: 1, variant_id: null, image_url: null, is_main: false, created_at: "2025-01-15T10:00:00" },
    { id: 3, product_id: 1, variant_id: null, image_url: null, is_main: false, created_at: "2025-01-15T10:00:00" },
    { id: 4, product_id: 1, variant_id: null, image_url: null, is_main: false, created_at: "2025-01-15T10:00:00" },
  ],
};

const COLOR_NAMES = {
  "#1F2A44": "Navy",
  "#E76F2E": "Coral",
  "#F5F7FA": "White",
  "#222222": "Midnight",
};

const GALLERY_EMOJIS = ["🎧", "🎵", "🔊", "📱"];
const formatPrice = (cents) => `$${(cents / 100).toFixed(2)}`;

function useProduct(id) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    setLoading(true);
    // Replace with real fetch:
    // fetch(`/api/products/${id}`)
    //   .then(r => r.json())
    //   .then(setData)
    //   .catch(setError)
    //   .finally(() => setLoading(false));
    const t = setTimeout(() => { setData(MOCK_PRODUCT); setLoading(false); }, 400);
    return () => clearTimeout(t);
  }, [id]);

  return { data, loading, error };
}

export default function ProductDetailPage({ cart = [], onAddToCart }) {
  const { id } = useParams();           // ✅ inside component
  const navigate = useNavigate();       // ✅ inside component

  const { data, loading, error } = useProduct(id);

  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [activeThumb,       setActiveThumb]       = useState(0);
  const [qty,               setQty]               = useState(1);
  const [wishlisted,        setWishlisted]         = useState(false);
  const [toastMsg,          setToastMsg]           = useState("");
  const [toastVisible,      setToastVisible]       = useState(false);
  const toastTimer = useRef(null); // ✅ proper useRef

  useEffect(() => {
    if (data) {
      const firstInStock = data.variants.find(v => v.stock > 0);
      setSelectedVariantId(firstInStock ? firstInStock.id : data.variants[0]?.id);
    }
  }, [data]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2000);
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", color: "var(--color-text-light)" }}>
      Loading product…
    </div>
  );

  if (error || !data) return (
    <div style={{ padding: 40, textAlign: "center", color: "#EF4444" }}>
      Failed to load product.
    </div>
  );

  const { product, variants, images } = data;
  const selectedVariant = variants.find(v => v.id === selectedVariantId) || variants[0];
  const inCart = cart.some(p => p.id === product.id);
  const outOfStock = selectedVariant?.stock === 0;

  const stockLabel = () => {
    if (!selectedVariant) return null;
    if (selectedVariant.stock === 0) return { cls: "out", text: "Out of stock" };
    if (selectedVariant.stock <= 5) return { cls: "low", text: `Only ${selectedVariant.stock} left` };
    return { cls: "in", text: "In stock" };
  };

  const stock = stockLabel();

  const handleAddToCart = () => {
    if (outOfStock) return;
    if (onAddToCart) onAddToCart({ ...product, variantId: selectedVariant?.id, qty });
    showToast(inCart ? "Removed from cart" : "Added to cart!");
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
        <a onClick={() => navigate("/store")}>Store</a> {/* ✅ navigate instead of onBack prop */}
        <span className="pdp-breadcrumb-sep">›</span>
        <a onClick={() => navigate("/store")}>{product.category_id === 1 ? "Electronics" : "Products"}</a>
        <span className="pdp-breadcrumb-sep">›</span>
        <span style={{ color: "var(--color-text)" }}>{product.name}</span>
      </nav>

      <div className="pdp-layout">

        {/* Gallery */}
        <div className="pdp-gallery">
          <div className="pdp-main-img">
            <span className="pdp-badge-main">New</span>
            {GALLERY_EMOJIS[activeThumb]}
          </div>
          <div className="pdp-thumbs">
            {images.map((img, i) => (
              <button
                key={img.id}
                className={`pdp-thumb ${activeThumb === i ? "active" : ""}`}
                onClick={() => setActiveThumb(i)}
                aria-label={`View image ${i + 1}`}
              >
                {GALLERY_EMOJIS[i]}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="pdp-info">
          <div>
            {product.brand && <div className="pdp-brand">{product.brand}</div>}
            <h1 className="pdp-name">{product.name}</h1>
          </div>

          <div className="pdp-rating">
            <span className="pdp-stars">★★★★☆</span>
            <span>4.2 · 186 reviews</span>
          </div>

          <div className="pdp-price-row">
            <span className="pdp-price">{formatPrice(selectedVariant?.price ?? 0)}</span>
            <span className="pdp-old-price">$179.99</span>
            <span className="pdp-save-badge">Save 28%</span>
          </div>

          <div>
            <div className="pdp-section-label">
              Color — <span style={{ color: "var(--color-text)", fontWeight: 600 }}>
                {COLOR_NAMES[selectedVariant?.color] ?? selectedVariant?.color}
              </span>
            </div>
            <div className="pdp-colors">
              {variants.map(v => (
                <button
                  key={v.id}
                  className={`pdp-color-btn ${selectedVariantId === v.id ? "selected" : ""}`}
                  disabled={v.stock === 0}
                  onClick={() => { setSelectedVariantId(v.id); setQty(1); }}
                  title={COLOR_NAMES[v.color] ?? v.color}
                  aria-label={`Select color ${COLOR_NAMES[v.color] ?? v.color}${v.stock === 0 ? " (out of stock)" : ""}`}
                >
                  <div
                    className="pdp-color-swatch"
                    style={{
                      background: v.color,
                      border: v.color === "#F5F7FA" ? "3px solid #E5E7EB" : "3px solid transparent",
                    }}
                  />
                  <span className="pdp-color-name">{COLOR_NAMES[v.color] ?? v.color}</span>
                  {v.stock === 0 && <span className="pdp-out-of-stock">OOS</span>}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {stock && (
              <div className="pdp-stock">
                <div className={`pdp-stock-dot ${stock.cls}`} />
                <span style={{ fontSize: 13, color: stock.cls === "out" ? "#EF4444" : stock.cls === "low" ? "#D97706" : "#16A34A", fontWeight: 500 }}>
                  {stock.text}
                </span>
              </div>
            )}
            {selectedVariant?.sku && (
              <p className="pdp-sku">SKU: <span>{selectedVariant.sku}</span></p>
            )}
          </div>

          <div className="pdp-actions">
            <div className="pdp-qty" aria-label="Quantity selector">
              <button className="pdp-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease">−</button>
              <span className="pdp-qty-val" aria-live="polite">{qty}</span>
              <button className="pdp-qty-btn" onClick={() => setQty(q => Math.min(selectedVariant?.stock ?? 1, q + 1))} disabled={outOfStock || qty >= (selectedVariant?.stock ?? 1)} aria-label="Increase">+</button>
            </div>

            <button
              className={`pdp-add-btn ${inCart ? "in-cart" : ""}`}
              onClick={handleAddToCart}
              disabled={outOfStock}
            >
              {outOfStock ? "Out of Stock" : inCart ? "✓ In Cart" : "Add to Cart"}
            </button>

            <button
              className={`pdp-wish-btn ${wishlisted ? "wishlisted" : ""}`}
              onClick={() => { setWishlisted(w => !w); showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist!"); }}
              aria-label="Add to wishlist"
            >
              {wishlisted ? "❤️" : "🤍"}
            </button>
          </div>

          {product.description && <p className="pdp-desc">{product.description}</p>}

          <div className="pdp-features">
            {["🎧 40mm Drivers", "🔋 30-hr Battery", "📶 Bluetooth 5.3", "🎙️ Noise Cancel", "✈️ Travel Case"].map(f => (
              <span key={f} className="pdp-feature-pill">{f}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={`toast ${toastVisible ? "toast-visible" : ""}`}>{toastMsg}</div>
    </>
  );
}