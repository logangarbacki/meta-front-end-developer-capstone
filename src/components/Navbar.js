import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/reserve">Reserve</Link></li>
          {isLoggedIn ? (
            <>
              <li className="navbar-username">Hi, {username}</li>
              <li><button className="navbar-logout" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" className="navbar-login">Login</Link></li>
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