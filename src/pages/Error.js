import { Link } from "react-router-dom";

function Error() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default Error;
