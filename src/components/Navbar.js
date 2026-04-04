import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/Logo.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Little Lemon Logo" className="navbar-logo" />
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/reserve">Reserve</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;