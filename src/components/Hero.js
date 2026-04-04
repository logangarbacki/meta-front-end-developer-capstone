import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Little 1</h1>
        <h2>Chicago</h2>
        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <button onClick={() => navigate("/reserve")}>Reserve a Table</button>
      </div>
    </section>
  );
};

export default Hero