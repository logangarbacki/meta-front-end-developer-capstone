import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Error.css";

function Error() {
  useEffect(() => {
    document.title = "404 — Little Lemon";
    return () => { document.title = "Little Lemon | Mediterranean Restaurant"; };
  }, []);

  return (
    <main className="error-page" aria-label="Page not found">
      <p className="error-code" aria-hidden="true">404</p>
      <div className="error-content">
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or may have been moved.</p>
        <Link to="/" className="error-home-btn">Back to Home</Link>
      </div>
    </main>
  );
}

export default Error;
