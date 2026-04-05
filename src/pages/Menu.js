import { useMenu } from "../hooks/useMenu";
import { CATEGORIES } from "../api/mockData";
import "./Menu.css";

function Menu() {
  const {
    items,
    loading,
    error,
    category,
    setCategory,
    sortBy,
    setSortBy,
    search,
    setSearch,
  } = useMenu();

  return (
    <main className="menu" aria-label="Menu of Little Lemon restaurant">
      <h2>Our Menu</h2>

      <div className="menu-controls">
        <input
          className="menu-search"
          type="search"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search menu items"
        />

        <div className="menu-filters" role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${category === cat ? " active" : ""}`}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          className="menu-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort menu items"
        >
          <option value="default">Sort: Default</option>
          <option value="name">Sort: Name A–Z</option>
          <option value="price-asc">Sort: Price Low–High</option>
          <option value="price-desc">Sort: Price High–Low</option>
        </select>
      </div>

      {loading && (
        <p className="menu-status" role="status" aria-live="polite">
          Loading menu…
        </p>
      )}

      {error && (
        <p className="menu-status menu-error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="menu-status" role="status">
          No items match your search.
        </p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="menu-grid">
          {items.map((item) => (
            <div className="menu-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="menu-card-body">
                <div className="menu-card-title">
                  <span>{item.name}</span>
                  <span className="menu-price">${item.price.toFixed(2)}</span>
                </div>
                <span className="menu-card-category">{item.category}</span>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Menu;
