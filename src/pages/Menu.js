import greekSalad from "../assets/greek salad.jpg";
import bruchetta from "../assets/bruchetta.svg";
import lemonDessert from "../assets/lemon dessert.jpg";
import restaurantFood from "../assets/restauranfood.jpg";
import "./Menu.css";

const menuItems = [
  {
    category: "Starters",
    items: [
      {
        name: "Greek Salad",
        price: "$12.99",
        description: "Crispy lettuce, peppers, olives and Chicago style feta cheese with garlic and rosemary croutons.",
        image: greekSalad,
      },
      {
        name: "Bruschetta",
        price: "$5.99",
        description: "Grilled bread smeared with garlic and seasoned with salt, olive oil, and fresh tomatoes.",
        image: bruchetta,
      },
    ],
  },
  {
    category: "Mains",
    items: [
      {
        name: "Grilled Fish",
        price: "$20.00",
        description: "Fresh Mediterranean sea bass, grilled to perfection with lemon butter and seasonal vegetables.",
        image: restaurantFood,
      },
    ],
  },
  {
    category: "Desserts",
    items: [
      {
        name: "Lemon Dessert",
        price: "$5.00",
        description: "Grandma's authentic lemon cake recipe, made with locally sourced ingredients.",
        image: lemonDessert,
      },
    ],
  },
];

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {menuItems.map((section) => (
        <section key={section.category} className="menu-section">
          <h3>{section.category}</h3>
          <div className="menu-grid">
            {section.items.map((item) => (
              <div className="menu-card" key={item.name}>
                <img src={item.image} alt={item.name} />
                <div className="menu-card-body">
                  <div className="menu-card-title">
                    <span>{item.name}</span>
                    <span className="menu-price">{item.price}</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default Menu;
