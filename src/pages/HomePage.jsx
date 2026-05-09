import { useState } from "react";
import Navbar       from "../components/navbar/Navbar";
import Starfield    from "../components/hero/Starfield";
import HeroContent  from "../components/hero/HeroContent";
import WaveDivider  from "../components/ui/WaveDivider";
import ProductCard  from "../components/ui/ProductCard";
import { PRODUCTS } from "../data/constants";




const homeStyles = `
  /* Hero section wrapper */
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .hero-section::after {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at center top, rgba(231,111,46,0.06) 0%, transparent 60%),
      radial-gradient(ellipse at center, transparent 40%, rgba(9,10,15,0.55) 100%);
    pointer-events: none; z-index: 1;
  }

  /* Products section */
  .products-section {
    background: var(--color-bg);
    padding: 5rem 2rem 6rem;
  }
  .products-inner {
    max-width: 1200px;
    margin: 0 auto;
  }
  .section-label {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--color-secondary);
    font-family: var(--font-body); margin-bottom: 1rem;
  }
  .section-label::before {
    content: ''; display: block; width: 24px; height: 2px;
    background: var(--color-secondary); border-radius: 2px;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 800;
    color: var(--color-primary); letter-spacing: -1px;
    margin-bottom: 3rem; line-height: 1.15;
  }
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 1.25rem;
  }
`;

export default function HomePage() {
  const [cartCount, setCartCount] = useState(3);

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    console.log("Added to cart:", product.name);
  };

  return (
    <>
      <style>{homeStyles}</style>

      {/* ── Fixed Navbar ── */}
      <Navbar cartCount={cartCount} />

      {/* ── Hero (dark + stars) ── */}
      <section className="hero-section">
        <Starfield />
        <HeroContent />
      </section>

      {/* ── Wave transition ── */}
      <WaveDivider fromColor="#090a0f" />

      {/* ── Products (light) ── */}
      <section className="products-section">
        <div className="products-inner">
          <div className="section-label">Today's Picks</div>
          <h2 className="section-title">Random Finds You'll Love 🎲</h2>
          <div className="cards-grid">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}