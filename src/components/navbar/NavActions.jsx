const actionsStyles = `
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    z-index: 2;
  }

  .cart-btn {
    position: relative;
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 40px;
    background: rgba(255, 255, 255, 0.07);
    border: 1.5px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-sm);
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    transition: all 0.2s;
  }
  .cart-btn:hover {
    background: rgba(231, 111, 46, 0.15);
    border-color: rgba(231, 111, 46, 0.4);
    color: #fff;
  }

  .cart-badge {
    position: absolute; top: -6px; right: -6px;
    background: var(--color-secondary); color: #fff;
    font-size: 0.6rem; font-weight: 700;
    width: 18px; height: 18px; border-radius: 50%;
    display: grid; place-items: center;
    font-family: var(--font-body);
    box-shadow: 0 0 10px rgba(231, 111, 46, 0.5);
    animation: badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .btn-signin {
    padding: 0.44rem 1.1rem;
    background: transparent;
    border: 1.5px solid rgba(255, 255, 255, 0.18);
    border-radius: var(--radius-sm);
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.85rem; font-weight: 500;
    transition: all 0.2s; white-space: nowrap;
  }
  .btn-signin:hover { border-color: rgba(255,255,255,0.4); color: #fff; }

  .btn-signup {
    padding: 0.44rem 1.2rem;
    background: var(--color-secondary);
    border: none; border-radius: var(--radius-sm);
    color: #fff; font-size: 0.85rem; font-weight: 600;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: var(--shadow-orange); white-space: nowrap;
  }
  .btn-signup:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 24px rgba(231, 111, 46, 0.55);
  }

  @media (max-width: 768px) {
    .btn-signin,
    .btn-signup { display: none; }
  }
`;

export default function NavActions({ cartCount = 0 }) {
  return (
    <>
      <style>{actionsStyles}</style>
      <div className="nav-actions">
        <button className="cart-btn" aria-label="Cart">
          🛒
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>
        <button className="btn-signin">Sign in</button>
        <button className="btn-signup">Sign up</button>
      </div>
    </>
  );
}
