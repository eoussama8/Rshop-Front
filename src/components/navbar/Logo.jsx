const logoStyles = `
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 2px;
    text-decoration: none;
    color: #fff;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.55rem;
    letter-spacing: -1px;
    transition: opacity 0.2s;
    position: relative;
    z-index: 2;
    user-select: none;
  }
  .nav-logo:hover { opacity: 0.9; }

  .logo-r {
    color: var(--color-secondary);
    text-shadow: 0 0 20px rgba(231,111,46,0.6);
    display: inline-block;
    animation: rFloat 3s ease-in-out infinite;
  }

  .logo-shop { color: #fff; }
`;

export default function Logo() {
  return (
    <>
      <style>{logoStyles}</style>
      <a href="/" className="nav-logo">
        <span className="logo-r">R</span>
        <span className="logo-shop">shop</span>
      </a>
    </>
  );
}
