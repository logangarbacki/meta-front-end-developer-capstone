import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, loginUser } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import "./Auth.css";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { items: guestCart, mergeCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => { document.title = "Create Account | Little Lemon"; }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const response = await registerUser(form.username, form.password);
    if (response.ok) {
      const loginResponse = await loginUser(form.username, form.password);
      setLoading(false);
      if (loginResponse.ok) {
        const data = await loginResponse.json();
        login(data.auth_token, form.username);
        if (guestCart.length > 0) mergeCart(guestCart);
        addToast(`Account created! Welcome, ${form.username}!`);
        navigate("/");
      }
    } else {
      setLoading(false);
      const data = await response.json();
      const msg = data.username?.[0] || data.password?.[0] || "Registration failed.";
      setError(msg);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-brand">
        <p className="auth-brand-name">Little Lemon</p>
        <p className="auth-brand-location">Chicago, IL</p>
        <p className="auth-brand-tagline">
          Join Little Lemon and enjoy seamless reservations, exclusive offers, and a taste of the Mediterranean.
        </p>
        <div className="auth-brand-perks">
          <div className="auth-perk"><span className="auth-perk-icon">🍋</span>Book tables instantly</div>
          <div className="auth-perk"><span className="auth-perk-icon">🛒</span>Save your cart across devices</div>
          <div className="auth-perk"><span className="auth-perk-icon">📅</span>View your booking history</div>
          <div className="auth-perk"><span className="auth-perk-icon">⭐</span>Get members-only specials</div>
        </div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-card">
          <h2>Create account</h2>
          <p className="auth-sub">Join Little Lemon — it only takes a second</p>
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
                autoComplete="username"
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
                autoComplete="new-password"
              />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;
