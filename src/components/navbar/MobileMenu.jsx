import { NAV_LINKS } from "../../data/constants";

const mobileMenuStyles = `
  .mobile-menu {
    position: fixed;
    top: 72px; left: 0; right: 0;
    background: rgba(10, 14, 26, 0.97);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(231, 111, 46, 0.12);
    padding: 1rem 1.5rem 1.5rem;
    transform: translateY(-8px);
    opacity: 0; pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
    box-shadow: 0 16px 40px rgba(0,0,0,0.5);
    z-index: 999;
  }
  .mobile-menu.open { opacity: 1; transform: translateY(0); pointer-events: all; }

  .mobile-search-wrap { display: flex; align-items: center; position: relative; margin-bottom: 1rem; }
  .mobile-search-wrap input {
    width: 100%;
    padding: 0.6rem 1rem 0.6rem 2.4rem;
    background: rgba(255,255,255,0.08);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-md);
    color: #fff; font-family: var(--font-body); font-size: 0.9rem; outline: none;
  }
  .mobile-search-wrap input::placeholder { color: rgba(255,255,255,0.3); }
  .mobile-search-icon { position: absolute; left: 0.75rem; color: rgba(255,255,255,0.35); }

  .mobile-link {
    display: block; padding: 0.72rem 0.5rem;
    color: rgba(255,255,255,0.65);
    font-size: 0.95rem; font-weight: 500;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: color 0.2s; font-family: var(--font-body);
  }
  .mobile-link:hover { color: #fff; }
  .mobile-link:last-of-type { border-bottom: none; }

  .mobile-cta { display: flex; gap: 0.6rem; margin-top: 1.25rem; }
  .mobile-cta button { flex: 1; text-align: center; padding: 0.7rem; }

  .hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; padding: 6px;
    border-radius: var(--radius-sm); transition: background 0.2s;
    position: relative; z-index: 2;
  }
  .hamburger:hover { background: rgba(255,255,255,0.06); }
  .hamburger span {
    display: block; width: 22px; height: 2px;
    background: #fff; border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1); transform-origin: center;
  }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  @media (max-width: 768px) {
    .hamburger { display: flex; }
  }
`;

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

export default function MobileMenu({ isOpen, onToggle }) {
  return (
    <>
      <style>{mobileMenuStyles}</style>

      {/* Hamburger trigger */}
      <button
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={onToggle}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {/* Slide-down menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <div className="mobile-search-wrap">
          <span className="mobile-search-icon"><SearchIcon /></span>
          <input type="text" placeholder="Search products…" />
        </div>

        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} className="mobile-link">
            {link.label}
          </a>
        ))}
        <a href="#" className="mobile-link">Categories</a>

        <div className="mobile-cta">
          <button className="btn-signin">Sign in</button>
          <button className="btn-signup">Sign up</button>
        </div>
      </div>
    </>
  );
}
