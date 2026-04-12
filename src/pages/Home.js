import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import restaurantFood from "../assets/restauranfood.jpg";
import { fetchFeaturedItems } from "../api/api";
import "./Home.css";

function Home() {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedItems()
      .then((data) => setSpecials(data))
      .catch(() => setSpecials([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
    <main className="home" aria-label="Homepage showcasing specials">
      <section className="specials" aria-labelledby="specials-heading">
        <div className="specials-header">
          <h2>This Week's Specials</h2>
          <Link to="/menu" aria-label="View online menu" className="online-menu-btn">Online Menu</Link>
        </div>
        {loading && <p>Loading specials...</p>}
        {!loading && specials.length === 0 && (
          <p className="specials-empty">No specials this week — check back soon!</p>
        )}
        <div className="specials-grid">
          {specials.map((item) => (
            <div className="special-card" key={item.id}>
              <div className="special-card-image">
                <img src={item.image_url || restaurantFood} alt={item.title} />
                {item.category && (
                  <span className="special-card-category">{item.category}</span>
                )}
              </div>
              <div className="special-card-body">
                <div className="special-card-title">
                  <span>{item.title}</span>
                  <span className="special-price">${item.price}</span>
                </div>
                <Link to="/menu">Order a delivery →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}

export default Home;
