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
  };

  useEffect(() => {
    fetchMenuItems()
      .then((data) => setItems(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const featured = items.filter((item) => item.featured);
  const grouped = groupByCategory(items);
  const categories = CATEGORY_ORDER.filter((c) => grouped[c]);

  const renderCard = (item) => (
    <div className="menu-card" key={item.id}>
      <div className="menu-card-img">
        <img src={item.image_url || getImage(item.title)} alt={item.title} />
      </div>
      <div className="menu-card-body">
        <div className="menu-card-title">
          <span>{item.title}</span>
          <span className="menu-price">${item.price}</span>
        </div>
        <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <main className="menu" aria-label="Menu of Little Lemon restaurant">
      <h2>Our Menu</h2>
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
      {error && <p className="menu-empty">Menu unavailable right now — check back soon.</p>}
      {!loading && !error && items.length === 0 && (
        <p className="menu-empty">No menu items available yet.</p>
      )}
      {!loading && !error && featured.length > 0 && (
        <section className="menu-section menu-section--featured">
          <h3>⭐ This Week's Specials</h3>
          <div className="menu-grid">
            {featured.map(renderCard)}
          </div>
        </section>
      )}
      {!loading && !error && categories.map((category) => (
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
