import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Error.css";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/events", label: "Events" },
  { to: "/reserve", label: "Reserve a Table" },
  { to: "/bookings", label: "My Account" },
];

function Error() {
  useEffect(() => {
    document.title = "404 — Little Lemon";
    return () => { document.title = "Little Lemon | Mediterranean Restaurant"; };
  }, []);

  return (
    <main className="error-page" aria-label="Page not found">
      <p className="error-code">404</p>
      <div className="error-content">
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or may have been moved.</p>
        <Link to="/" className="error-home-btn">Back to Home</Link>
        <div className="error-quick-links">
          <p className="error-quick-label">Or try one of these:</p>
          <div className="error-quick-nav">
            {QUICK_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="error-quick-link">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Error;
