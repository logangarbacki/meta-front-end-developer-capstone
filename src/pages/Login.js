import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import "./Auth.css";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { items: guestCart, mergeCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => { document.title = "Sign In | Little Lemon"; }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const response = await loginUser(form.username, form.password);
    setLoading(false);
    if (response.ok) {
      const data = await response.json();
      login(data.auth_token, form.username);
      if (guestCart.length > 0) mergeCart(guestCart);
      addToast(`Welcome back, ${form.username}!`);
      navigate("/");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h2>Sign In</h2>
        <p className="auth-sub">Welcome back to Little Lemon</p>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="your_username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="reserve-btn auth-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
