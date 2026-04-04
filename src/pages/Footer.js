import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer" aria-label="Little Lemon Footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Little Lemon</h2>
          <p>Mediterranean Restaurant</p>
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
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;