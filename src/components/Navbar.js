import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/Logo.svg";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { logoutUser } from "../api/api";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const { isLoggedIn, username, token, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser(token);
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="Little Lemon Logo" className="navbar-logo" />
        <ul className="navbar-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/menu">Menu</NavLink></li>
          <li><NavLink to="/reserve">Reserve</NavLink></li>
          {isLoggedIn ? (
            <>
              <li className="navbar-username">Hi, {username}</li>
              <li><button className="navbar-logout" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><NavLink to="/login" className={({ isActive }) => isActive ? "navbar-login active" : "navbar-login"}>Login</NavLink></li>
          )}
          <li>
            <button className="navbar-cart" onClick={() => setCartOpen(true)} aria-label="Open cart">
              🛒
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>
          </li>
        </ul>
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;