const searchStyles = `
  .nav-search {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .search-input {
    padding: 0.42rem 1rem 0.42rem 2.4rem;
    background: rgba(255, 255, 255, 0.07);
    border: 1.5px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-full);
    color: #fff;
    font-family: var(--font-body);
    font-size: 0.85rem;
    width: 200px;
    transition: all 0.3s;
    outline: none;
  }

  .search-input::placeholder { color: rgba(255, 255, 255, 0.35); }

  .search-input:focus {
    width: 240px;
    border-color: rgba(231, 111, 46, 0.45);
    background: rgba(255, 255, 255, 0.1);
  }

  .search-icon {
    position: absolute;
    left: 0.75rem;
    color: rgba(255, 255, 255, 0.35);
    pointer-events: none;
    display: flex;
    align-items: center;
  }

  @media (max-width: 900px) {
    .nav-search { display: none; }
  }
`;

export default function SearchBar() {
  return (
    <>
      <style>{searchStyles}</style>
      <div className="nav-search">
        <span className="search-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>
        <input
          className="search-input"
          type="text"
          placeholder="Search products…"
        />
      </div>
    </>
  );
}
