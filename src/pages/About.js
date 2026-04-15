import { useEffect } from "react";
import { Link } from "react-router-dom";
import marioAndAdrianA from "../assets/Mario and Adrian A.jpg";
import marioAndAdrianB from "../assets/Mario and Adrian b.jpg";
import "./About.css";

const VALUES = [
  { icon: "🍋", title: "Authenticity", desc: "Every recipe is rooted in tradition, refined over generations of Mediterranean cooking." },
  { icon: "🌿", title: "Fresh Ingredients", desc: "We source locally and seasonally, working with Chicago farmers and importers we trust." },
  { icon: "🤝", title: "Family First", desc: "From our kitchen to your table, we treat every guest like a member of our family." },
  { icon: "✨", title: "Modern Twist", desc: "Classic flavors, presented with a contemporary touch that surprises and delights." },
];

function About() {
  useEffect(() => { document.title = "About Us | Little Lemon"; }, []);

  return (
    <main className="about" aria-label="About Little Lemon restaurant">

      {/* ── Story ── */}
      <section className="about-story">
        <div className="about-text">
          <p className="about-eyebrow">Our story</p>
          <h2>Little Lemon</h2>
          <h3>Chicago</h3>
          <p>
            Little Lemon is owned by two Italian brothers, Mario and Adrian, who
            moved to the United States to pursue their shared dream of owning a
            restaurant. To craft an authentic menu, the brothers spent years
            researching traditional Mediterranean recipes across Greece, Turkey,
            Lebanon, and Italy.
          </p>
          <p>
            Since opening in 2012, we've been focused on traditional recipes
            served with a modern twist — bringing the warmth and flavors of the
            Mediterranean coast to the heart of Chicago.
          </p>
          <Link to="/reserve" className="about-cta">Reserve a Table →</Link>
        </div>
        <div className="about-images">
          <img src={marioAndAdrianA} alt="Mario and Adrian" className="about-img-top" loading="lazy" />
          <img src={marioAndAdrianB} alt="Mario and Adrian cooking" className="about-img-bottom" loading="lazy" />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="about-stats">
        <div className="about-stat">
          <span className="about-stat-num">14+</span>
          <span className="about-stat-label">Years in Chicago</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-num">2</span>
          <span className="about-stat-label">Founders</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-num">50k+</span>
          <span className="about-stat-label">Happy Guests</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-num">4.9★</span>
          <span className="about-stat-label">Average Rating</span>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values">
        <div className="about-values-header">
          <p className="about-eyebrow">What drives us</p>
          <h2>Our Values</h2>
        </div>
        <div className="about-values-grid">
          {VALUES.map((v) => (
            <div className="about-value-card" key={v.title}>
              <span className="about-value-icon">{v.icon}</span>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

export default About;
