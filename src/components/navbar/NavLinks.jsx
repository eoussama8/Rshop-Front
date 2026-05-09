import { useState, useEffect } from "react";
import { NAV_LINKS, CATEGORIES } from "../../data/constants";

const navLinksStyles = `
  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    list-style: none;
    position: relative;
    z-index: 2;
  }

  .nav-link-item a {
    position: relative;
    display: block;
    padding: 0.45rem 0.9rem;
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    border-radius: var(--radius-sm);
    transition: color 0.2s, background 0.2s;
  }

  .nav-link-item a::after {
    content: '';
    position: absolute;
    bottom: 3px; left: 50%; right: 50%;
    height: 2px;
    background: var(--color-secondary);
    border-radius: 2px;
    transition: left 0.25s ease, right 0.25s ease;
    box-shadow: 0 0 8px rgba(231, 111, 46, 0.7);
  }

  .nav-link-item a:hover { color: #fff; background: rgba(255,255,255,0.04); }
  .nav-link-item a:hover::after,
  .nav-link-item a.active::after { left: 0.9rem; right: 0.9rem; }
  .nav-link-item a.active { color: #fff; }

  /* Dropdown */
  .nav-dropdown { position: relative; z-index: 2; }

  .dropdown-toggle-btn {
    display: flex; align-items: center; gap: 4px;
    padding: 0.45rem 0.9rem;
    background: none; border: none;
    font-family: var(--font-body); font-size: 0.9rem; font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
    border-radius: var(--radius-sm);
    transition: color 0.2s, background 0.2s;
  }
  .dropdown-toggle-btn:hover { color: #fff; background: rgba(255,255,255,0.04); }

  .chevron { width: 13px; height: 13px; transition: transform 0.25s ease; opacity: 0.55; }
  .chevron.open { transform: rotate(180deg); opacity: 1; }

  .dropdown-menu-custom {
    position: absolute;
    top: calc(100% + 10px); left: 50%;
    transform: translateX(-50%) translateY(-6px);
    min-width: 210px;
    background: rgba(12, 17, 30, 0.97);
    backdrop-filter: blur(24px);
    border-radius: 14px;
    border: 1px solid rgba(231, 111, 46, 0.15);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
    padding: 6px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .dropdown-menu-custom.open {
    opacity: 1; pointer-events: all;
    transform: translateX(-50%) translateY(0);
  }
  .dropdown-menu-custom a {
    display: flex; align-items: center; gap: 10px;
    padding: 0.6rem 0.85rem; border-radius: var(--radius-sm);
    color: rgba(255,255,255,0.7); font-size: 0.875rem; font-weight: 500;
    transition: background 0.15s, color 0.15s;
  }
  .dropdown-menu-custom a:hover { background: rgba(231,111,46,0.1); color: #fff; }
  .drop-icon {
    width: 30px; height: 30px; border-radius: 7px;
    display: grid; place-items: center; font-size: 0.9rem; flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
  }
`;

export default function NavLinks() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".nav-dropdown")) setDropdownOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <>
      <style>{navLinksStyles}</style>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.label} className="nav-link-item">
            <a href={link.href} className={link.active ? "active" : ""}>
              {link.label}
            </a>
          </li>
        ))}

        <li className="nav-dropdown">
          <button
            className="dropdown-toggle-btn"
            onClick={() => setDropdownOpen((v) => !v)}
          >
            Categories
            <svg
              className={`chevron ${dropdownOpen ? "open" : ""}`}
              viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className={`dropdown-menu-custom ${dropdownOpen ? "open" : ""}`}>
            {CATEGORIES.map((cat) => (
              <a key={cat.label} href={cat.href}>
                <span className="drop-icon" style={{ background: cat.bg }}>
                  {cat.icon}
                </span>
                {cat.label}
              </a>
            ))}
          </div>
        </li>
      </ul>
    </>
  );
}
