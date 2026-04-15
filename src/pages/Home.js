import { useState, useEffect, useRef } from "react";
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

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function Home() {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialsRef, specialsVisible] = useReveal();
  const [testimonialsRef, testimonialsVisible] = useReveal();

  useEffect(() => { document.title = "Little Lemon | Mediterranean Restaurant"; }, []);

  useEffect(() => {
    fetchFeaturedItems()
      .then((data) => setSpecials(data))
      .catch(() => setSpecials([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="home" aria-label="Homepage">

      {/* ── Hero ── */}
      <section className="hero" aria-label="Hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Little Lemon</p>
          <h1 className="hero-title">We are a family restaurant</h1>
          <p className="hero-subtitle">
            We are a family-owned Mediterranean restaurant focused on traditional
            recipes served with a modern twist. Located in the heart of Chicago
            since 2012.
          </p>
          <div className="hero-actions">
            <Link to="/reserve" className="hero-btn hero-btn--primary">Reserve a Table</Link>
            <Link to="/menu" className="hero-btn hero-btn--secondary">View Menu</Link>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img src={restaurantFood} alt="Delicious Mediterranean dish" className="hero-img" />
          <div className="hero-badge">
            <span className="hero-badge-num">14</span>
            <span className="hero-badge-label">Years of<br/>Excellence</span>
          </div>
        </div>
        <div className="hero-scroll-hint" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="stats-bar">
        <div className="stat"><span className="stat-num">14+</span><span className="stat-label">Years in Chicago</span></div>
        <div className="stat-divider" />
        <div className="stat"><span className="stat-num">200+</span><span className="stat-label">Menu Items</span></div>
        <div className="stat-divider" />
        <div className="stat"><span className="stat-num">4.9★</span><span className="stat-label">Guest Rating</span></div>
        <div className="stat-divider" />
        <div className="stat"><span className="stat-num">50k+</span><span className="stat-label">Happy Guests</span></div>
      </div>

      <div className="home-sections">
        {/* ── Specials ── */}
        <section
          ref={specialsRef}
          className={`specials reveal${specialsVisible ? " revealed" : ""}`}
          aria-labelledby="specials-heading"
        >
          <div className="specials-header">
            <div>
              <p className="section-eyebrow">Fresh this week</p>
              <h2 id="specials-heading">This Week's Specials</h2>
            </div>
            <Link to="/menu" className="online-menu-btn">Online Menu →</Link>
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
              {specials.map((item, i) => (
                <div
                  className="special-card"
                  key={item.id}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
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
                    {item.description && (
                      <p className="special-card-desc">{item.description}</p>
                    )}
                    <Link to="/menu">Order a delivery →</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Testimonials ── */}
        <section
          ref={testimonialsRef}
          className={`testimonials reveal${testimonialsVisible ? " revealed" : ""}`}
          aria-labelledby="testimonials-heading"
        >
          <div className="section-header-center">
            <p className="section-eyebrow">Our guests</p>
            <h2 id="testimonials-heading">What Our Guests Say</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div
                className="testimonial-card"
                key={t.id}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
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

        {/* ── Reserve CTA ── */}
        <section className="home-cta reveal revealed" aria-label="Reservation call to action">
          <div className="home-cta-inner">
            <h2>Ready to dine with us?</h2>
            <p>Book your table online in seconds. We'd love to have you.</p>
            <Link to="/reserve" className="hero-btn hero-btn--primary">Reserve a Table</Link>
          </div>
        </section>
      </div>

    </main>
  );
}

export default Home;
