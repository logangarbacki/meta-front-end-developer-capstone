import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, loginUser } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "./Auth.css";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

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
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-sub">Join Little Lemon to make reservations</p>
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
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
