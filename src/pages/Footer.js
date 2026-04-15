import { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

function Footer() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast("You're subscribed! Welcome to the family 🍋");
    setEmail("");
  };

  return (
    <footer className="footer" aria-label="Little Lemon Footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Little Lemon</h2>
          <p>Mediterranean Restaurant</p>
          <p className="footer-brand-tagline">Traditional recipes, modern twist.<br />Chicago, IL since 2012.</p>
        </div>

        <nav className="footer-nav">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reserve">Reservations</Link></li>
          </ul>
        </nav>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>123 Lemon Street</p>
          <p>Chicago, IL</p>
          <p>(312) 555-0198</p>
          <p>info@littlelemon.com</p>
        </div>

        <div className="footer-newsletter">
          <h3>Stay in the Loop</h3>
          <p>Get weekly specials and events straight to your inbox.</p>
          <form className="newsletter-form" onSubmit={handleNewsletter}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email for newsletter"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
