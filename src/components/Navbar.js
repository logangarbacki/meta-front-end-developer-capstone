import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/Logo.svg";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { logoutUser } from "../api/api";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const { isLoggedIn, username, token, logout } = useAuth();
  const { totalItems } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === "Escape") { setMenuOpen(false); setCartOpen(false); } };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logoutUser(token);
    logout();
    closeMenu();
    addToast("Signed out successfully", "info");
    navigate("/");
  };

  return (
    <>
      <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <img src={logo} alt="Little Lemon Logo" className="navbar-logo" />

        {/* Desktop + mobile nav links */}
        {menuOpen && <div className="navbar-overlay" onClick={closeMenu} />}
        <ul className={`navbar-links${menuOpen ? " navbar-links--open" : ""}`}>
          <li className="navbar-mobile-header">
            <img src={logo} alt="Little Lemon Logo" className="navbar-logo" />
            <button className="navbar-mobile-close" onClick={closeMenu} aria-label="Close menu">✕</button>
          </li>
          <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/menu" onClick={closeMenu}>Menu</NavLink></li>
          <li><NavLink to="/reserve" onClick={closeMenu}>Reserve</NavLink></li>
          <li><NavLink to="/events" onClick={closeMenu}>Events</NavLink></li>
          {isLoggedIn ? (
            <>
              <li><NavLink to="/bookings" onClick={closeMenu}>My Bookings</NavLink></li>
              <li className="navbar-username">Hi, {username}</li>
              <li><button className="navbar-logout" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className={({ isActive }) => isActive ? "navbar-login active" : "navbar-login"}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>

        {/* Right side: theme + cart + hamburger */}
        <div className="navbar-right">
<button className="navbar-cart" onClick={() => setCartOpen(true)} aria-label="Open cart">
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
          <button
            className={`navbar-hamburger${menuOpen ? " navbar-hamburger--open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
