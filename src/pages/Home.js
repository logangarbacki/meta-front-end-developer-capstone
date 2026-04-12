import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import restaurantFood from "../assets/restauranfood.jpg";
import { fetchFeaturedItems } from "../api/api";
import "./Home.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Chicago, IL",
    rating: 5,
    text: "The best Mediterranean food in Chicago! The Grilled Chicken Shwarma Bowl is absolutely incredible. We come here every month.",
  },
  {
    id: 2,
    name: "James T.",
    location: "Evanston, IL",
    rating: 5,
    text: "Amazing atmosphere and even better food. The Falafel Platter is a must-try. Staff is always so warm and welcoming.",
  },
  {
    id: 3,
    name: "Priya K.",
    location: "Chicago, IL",
    rating: 5,
    text: "Ordered online for the first time — seamless experience and the food arrived fresh and delicious. Little Lemon never disappoints!",
  },
];

function Stars({ count }) {
  return (
    <div className="testimonial-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} aria-hidden="true">★</span>
      ))}
    </div>
  );
}

function Home() {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { document.title = "Little Lemon | Mediterranean Restaurant"; }, []);

  useEffect(() => {
    fetchFeaturedItems()
      .then((data) => setSpecials(data))
      .catch(() => setSpecials([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="home" aria-label="Homepage">

      {/* ── Specials ── */}
      <section className="specials" aria-labelledby="specials-heading">
        <div className="specials-header">
          <h2 id="specials-heading">This Week's Specials</h2>
          <Link to="/menu" aria-label="View online menu" className="online-menu-btn">Online Menu</Link>
        </div>
        {loading && (
          <div className="specials-grid">
            {[1, 2, 3].map((n) => (
              <div className="skeleton-card" key={n}>
                <div className="skeleton-img" />
                <div className="skeleton-body">
                  <div className="skeleton-line" />
                  <div className="skeleton-line skeleton-line--short" />
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && specials.length === 0 && (
          <p className="specials-empty">No specials this week — check back soon!</p>
        )}
        {!loading && specials.length > 0 && (
          <div className="specials-grid">
            {specials.map((item) => (
              <div className="special-card" key={item.id}>
                <div className="special-card-image">
                  <img
                    src={item.image_url || restaurantFood}
                    alt={item.title}
                    loading="lazy"
                  />
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
        )}
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials" aria-labelledby="testimonials-heading">
        <h2 id="testimonials-heading">What Our Guests Say</h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div className="testimonial-card" key={t.id}>
              <Stars count={t.rating} />
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-location">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

export default Home;
