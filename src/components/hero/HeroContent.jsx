import { HERO_CHIPS, HERO_STATS } from "../../data/constants";

const heroContentStyles = `
  .hero-content {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center;
    padding: 130px 1.5rem 6rem; position: relative; z-index: 2;
  }

  /* Badge */
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(231,111,46,0.12); border: 1px solid rgba(231,111,46,0.35);
    color: #f0915a; padding: 0.38rem 1rem; border-radius: var(--radius-full);
    font-size: 0.76rem; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; margin-bottom: 2rem;
    font-family: var(--font-body);
    animation: fadeUp 0.7s ease-out 0.2s both;
    box-shadow: 0 0 24px rgba(231,111,46,0.12);
  }
  .tag-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--color-secondary);
    animation: blink 1.5s ease-in-out infinite;
  }

  /* Title */
  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    font-weight: 800; line-height: 1.06;
    color: #fff; letter-spacing: -2.5px;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.8s ease-out 0.35s both;
  }
  .hero-title .word-random {
    color: var(--color-secondary);
    text-shadow: 0 0 40px rgba(231,111,46,0.45);
    display: inline-block;
  }
  .hero-title .word-everything {
    background: linear-gradient(90deg, var(--color-accent), #a78bfa);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* Subtitle */
  .hero-sub {
    font-size: 1.05rem; color: rgba(255,255,255,0.48);
    max-width: 480px; line-height: 1.8; margin-bottom: 2.5rem;
    font-family: var(--font-body); font-weight: 300;
    animation: fadeUp 0.9s ease-out 0.5s both;
  }

  /* Category Chips */
  .hero-chips {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem;
    margin-bottom: 2.5rem; animation: fadeUp 0.9s ease-out 0.6s both;
  }
  .chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 0.32rem 0.85rem;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-full); color: rgba(255,255,255,0.6);
    font-size: 0.8rem; font-weight: 500; font-family: var(--font-body);
    transition: all 0.2s; cursor: default;
  }
  .chip:hover { background: rgba(231,111,46,0.12); border-color: rgba(231,111,46,0.3); color: #fff; }

  /* CTA Buttons */
  .hero-actions {
    display: flex; gap: 0.9rem; flex-wrap: wrap; justify-content: center;
    animation: fadeUp 1s ease-out 0.7s both;
  }
  .btn-shop {
    padding: 0.9rem 2.2rem;
    background: var(--color-secondary); border: none; border-radius: var(--radius-md);
    color: #fff; font-family: var(--font-display); font-size: 1rem; font-weight: 700;
    box-shadow: var(--shadow-orange);
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex; align-items: center; gap: 8px;
  }
  .btn-shop:hover { transform: translateY(-2px); box-shadow: 0 8px 40px rgba(231,111,46,0.65); }
  .btn-explore {
    padding: 0.9rem 2rem;
    background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.15);
    border-radius: var(--radius-md); color: rgba(255,255,255,0.85);
    font-family: var(--font-body); font-size: 0.95rem; font-weight: 500;
    transition: all 0.2s;
  }
  .btn-explore:hover { border-color: rgba(77,163,255,0.4); color: #fff; background: rgba(77,163,255,0.07); }

  /* Stats */
  .hero-stats {
    display: flex; gap: 2.5rem; margin-top: 4rem;
    flex-wrap: wrap; justify-content: center;
    animation: fadeUp 1s ease-out 0.9s both;
  }
  .stat { text-align: center; }
  .stat-number {
    font-family: var(--font-display); font-size: 1.6rem; font-weight: 800;
    color: #fff; letter-spacing: -1px; display: block; line-height: 1; margin-bottom: 3px;
  }
  .stat-number span { color: var(--color-secondary); }
  .stat-label {
    font-size: 0.75rem; color: rgba(255,255,255,0.38);
    text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-body);
  }
  .stat-divider { width: 1px; background: rgba(255,255,255,0.08); align-self: stretch; }

  /* Scroll cue */
  .scroll-cue {
    position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; z-index: 2;
    animation: fadeUp 1s ease-out 1.2s both;
  }
  .scroll-cue-line {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, rgba(231,111,46,0.7), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    .hero-title { letter-spacing: -1px; }
    .hero-stats  { gap: 1.5rem; }
    .stat-divider { display: none; }
  }
`;

export default function HeroContent() {
  return (
    <>
      <style>{heroContentStyles}</style>

      <div className="hero-content">
        {/* Badge */}
        <div className="hero-tag">
          <span className="tag-dot" /> New drops every day
        </div>

        {/* Headline */}
        <h1 className="hero-title">
          Shop <span className="word-random">Random.</span><br />
          Find <span className="word-everything">Everything.</span>
        </h1>

        {/* Sub */}
        <p className="hero-sub">
          Rshop brings you a universe of products — from gadgets to fashion,
          home decor to beauty — all in one place, always at a surprise price.
        </p>

        {/* Chips */}
        <div className="hero-chips">
          {HERO_CHIPS.map((chip) => (
            <span key={chip} className="chip">{chip}</span>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero-actions">
          <button className="btn-shop"><span>🛍️</span> Start Shopping</button>
          <button className="btn-explore">Explore Categories →</button>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          {HERO_STATS.map((s, i) => (
            <>
              <div key={s.label} className="stat">
                <span className="stat-number">{s.number}<span>{s.suffix}</span></span>
                <span className="stat-label">{s.label}</span>
              </div>
              {i < HERO_STATS.length - 1 && <div className="stat-divider" key={`div-${i}`} />}
            </>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue">
        <div className="scroll-cue-line" />
      </div>
    </>
  );
}
