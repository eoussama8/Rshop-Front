import { useState, useEffect } from "react";
import Logo       from "./Logo";
import NavLinks   from "./NavLinks";
import SearchBar  from "./SearchBar";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";

const navbarStyles = `
  .nav-root {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 1000;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-root.scrolled {
    background: rgba(10, 14, 26, 0.88);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(231, 111, 46, 0.12);
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.45);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 72px;
  }
`;

export default function Navbar({ cartCount = 0 }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{navbarStyles}</style>

      <nav className={`nav-root ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <Logo />
          <NavLinks />
          <SearchBar />
          <NavActions cartCount={cartCount} />
          <MobileMenu
            isOpen={mobileOpen}
            onToggle={() => setMobileOpen((v) => !v)}
          />
        </div>
      </nav>
    </>
  );
}
