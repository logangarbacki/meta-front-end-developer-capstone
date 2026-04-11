import { useState, useEffect } from "react";
import greekSalad from "../assets/greek salad.jpg";
import bruchetta from "../assets/bruchetta.svg";
import lemonDessert from "../assets/lemon dessert.jpg";
import restaurantFood from "../assets/restauranfood.jpg";
import { fetchMenuItems } from "../api/api";
import "./Menu.css";

const fallbackItems = [
  { id: 1, title: "Greek Salad", price: "12.99", inventory: 50 },
  { id: 2, title: "Bruschetta", price: "5.99", inventory: 30 },
  { id: 3, title: "Grilled Fish", price: "20.00", inventory: 20 },
  { id: 4, title: "Lemon Dessert", price: "5.00", inventory: 40 },
];

const itemImages = {
  "Greek Salad": greekSalad,
  "Bruschetta": bruchetta,
  "Lemon Dessert": lemonDessert,
};

function getImage(title) {
  return itemImages[title] || restaurantFood;
}

function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems()
      .then((data) => setItems(data))
      .catch(() => setItems(fallbackItems))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="menu" aria-label="Menu of Little Lemon restaurant">
      <h2>Our Menu</h2>
      {loading ? (
        <p>Loading menu...</p>
      ) : (
        <div className="menu-grid">
          {items.map((item) => (
            <div className="menu-card" key={item.id}>
              <img src={getImage(item.title)} alt={item.title} />
              <div className="menu-card-body">
                <div className="menu-card-title">
                  <span>{item.title}</span>
                  <span className="menu-price">${item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Menu;
