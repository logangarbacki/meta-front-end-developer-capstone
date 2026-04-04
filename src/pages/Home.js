import greekSalad from "../assets/greek salad.jpg";
import bruchetta from "../assets/bruchetta.svg";
import lemonDessert from "../assets/lemon dessert.jpg";
import "./Home.css";

const specials = [
  {
    name: "Greek Salad",
    price: "$12.99",
    description:
      "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    image: greekSalad,
  },
  {
    name: "Bruchetta",
    price: "$5.99",
    description:
      "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    image: bruchetta,
  },
  {
    name: "Lemon Dessert",
    price: "$5.00",
    description:
      "This comes straight from grandma's recipe book. Every last ingredient has been sourced and is as authentic as can be imagined.",
    image: lemonDessert,
  },
];

function Home() {
  return (
    <main className="home">
      <section className="specials">
        <div className="specials-header">
          <h2>This Week's Specials</h2>
          <button className="online-menu-btn">Online Menu</button>
        </div>
        <div className="specials-grid">
          {specials.map((item) => (
            <div className="special-card" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div className="special-card-body">
                <div className="special-card-title">
                  <span>{item.name}</span>
                  <span className="special-price">{item.price}</span>
                </div>
                <p>{item.description}</p>
                <a href="/menu">Order a delivery →</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
