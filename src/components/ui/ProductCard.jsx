import '../../styles/cardStyle.css'

import { useState } from "react";

export default function ProductCard({ product, onAddToCart }) {
  const { name, category, emoji, bg, price, oldPrice, badge } = product;
  const [liked,  setLiked]  = useState(false);
  const [added,  setAdded]  = useState(false);

  const handleAdd = () => {
    onAddToCart?.(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  return (
    <>

      <div className="product-card">

        {/* ── Image ── */}
        <div className="card-img" style={{ background: bg }}>
          <span className="card-img-emoji">{emoji}</span>

          {/* Rshop Pick badge — lives inside the image area */}
          {badge && (
            <div className="badge-random">🎲 Rshop Pick</div>
          )}

          {/* Wishlist */}
          <button
            className={`card-wish${liked ? " liked" : ""}`}
            onClick={() => setLiked(l => !l)}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          >
            {liked ? "♥" : "♡"}
          </button>
        </div>

        {/* ── Body ── */}
        <div className="card-body">
          <div className="card-category">{category}</div>
          <div className="card-name">{name}</div>

          <div className="card-footer">
            <div className="card-price">
              {oldPrice && <span className="old-price">{oldPrice}</span>}
              {price}
            </div>

            <button
              className={`card-add${added ? " added" : ""}`}
              onClick={handleAdd}
              aria-label="Add to cart"
            >
              {added ? "✓" : "+"}
            </button>
          </div>
        </div>

      </div>
    </>
  );
}