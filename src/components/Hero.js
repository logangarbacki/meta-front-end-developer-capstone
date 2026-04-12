import { useNavigate } from "react-router-dom";
import restaurantFood from "../assets/restauranfood.jpg";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
          <button onClick={() => navigate("/reserve")}>Reserve a Table</button>
        </div>
        <div className="hero-image">
          <img src={restaurantFood} alt="Little Lemon restaurant food" />
        </div>
      </div>
    </section>
  );
};

export default Hero;