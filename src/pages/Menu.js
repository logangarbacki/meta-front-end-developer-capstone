import { useState, useEffect } from "react";
import greekSalad from "../assets/greek salad.jpg";
import bruchetta from "../assets/bruchetta.svg";
import lemonDessert from "../assets/lemon dessert.jpg";
import restaurantFood from "../assets/restauranfood.jpg";
import { fetchMenuItems } from "../api/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

const itemImages = {
  "Greek Salad": greekSalad,
  "Bruschetta": bruchetta,
  "Lemon Dessert": lemonDessert,
};

function getImage(title) {
  return itemImages[title] || restaurantFood;
}

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});
}

const CATEGORY_ORDER = ["Starters", "Mains", "Desserts", "Drinks", "Other"];

function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [addedIds, setAddedIds] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => { document.title = "Menu | Little Lemon"; }, []);

  const { addItem } = useCart();
  const { isLoggedIn } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    addItem(item);
    addToast(`${item.title} added to cart`);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => { const n = { ...prev }; delete n[item.id]; return n; });
    }, 1500);
  };

  useEffect(() => {
    fetchMenuItems()
      .then((data) => setItems(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const query = search.trim().toLowerCase();
  const filteredItems = query
    ? items.filter((item) => item.title.toLowerCase().includes(query))
    : items;

  const featured = filteredItems.filter((item) => item.featured);
  const grouped = groupByCategory(filteredItems);
  const categories = CATEGORY_ORDER.filter((c) => grouped[c]);
  const tabs = ["All", ...CATEGORY_ORDER.filter((c) => groupByCategory(items)[c])];

  const renderCard = (item) => (
    <div className="menu-card" key={item.id}>
      <div className="menu-card-img">
        <img
          src={item.image_url || getImage(item.title)}
          alt={item.title}
          loading="lazy"
        />
      </div>
      <div className="menu-card-body">
        <div className="menu-card-title">
          <span>{item.title}</span>
          <span className="menu-price">${item.price}</span>
        </div>
        <button
          className={`add-to-cart-btn${addedIds[item.id] ? " add-to-cart-btn--added" : ""}`}
          onClick={() => handleAddToCart(item)}
          disabled={!!addedIds[item.id]}
        >
          {addedIds[item.id] ? "✓ Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );

  const showFeatured = activeTab === "All" && featured.length > 0;
  const visibleCategories = activeTab === "All" ? categories : categories.filter(c => c === activeTab);

  return (
    <main className="menu" aria-label="Menu of Little Lemon restaurant">
      <div className="menu-header">
        <h2>Our Menu</h2>
        <div className="menu-search">
          <span className="menu-search-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            placeholder="Search menu..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActiveTab("All"); }}
            className="menu-search-input"
            aria-label="Search menu items"
          />
          {search && (
            <button className="menu-search-clear" onClick={() => setSearch("")} aria-label="Clear search">✕</button>
          )}
        </div>
      </div>

      {loading && (
        <div className="menu-skeleton-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div className="menu-skeleton-card" key={n}>
              <div className="menu-skeleton-img" />
              <div className="menu-skeleton-body">
                <div className="menu-skeleton-line" />
                <div className="menu-skeleton-line menu-skeleton-line--short" />
                <div className="menu-skeleton-btn" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && items.length > 0 && !query && (
        <div className="menu-tabs" role="tablist" aria-label="Filter by category">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`menu-tab${activeTab === tab ? " menu-tab--active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {error && <p className="menu-empty">Menu unavailable right now — check back soon.</p>}
      {!loading && !error && items.length === 0 && (
        <p className="menu-empty">No menu items available yet.</p>
      )}
      {!loading && !error && query && filteredItems.length === 0 && (
        <p className="menu-empty">No items matching "<strong>{search}</strong>" — try something else.</p>
      )}

      {!loading && !error && showFeatured && (
        <section className="menu-section menu-section--featured">
          <h3>⭐ This Week's Specials</h3>
          <div className="menu-grid">
            {featured.map(renderCard)}
          </div>
        </section>
      )}

      {!loading && !error && visibleCategories.map((category) => (
        <section key={category} className="menu-section">
          <h3>{category}</h3>
          <div className="menu-grid">
            {grouped[category].map(renderCard)}
          </div>
        </section>
      ))}
    </main>
  );
}

export default Menu;
