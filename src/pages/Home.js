import { useFetch } from "../hooks/useFetch";
import { getSpecials } from "../services/menuService";
import "./Home.css";

function Home() {
  const { data: specials, loading, error } = useFetch(getSpecials, []);

  return (
    <main className="home" aria-label="Homepage showcasing specials">
      <section className="specials" aria-labelledby="specials-heading">
        <div className="specials-header">
          <h2 id="specials-heading">This Week's Specials</h2>
          <button aria-label="View online menu" className="online-menu-btn">
            Online Menu
          </button>
        </div>

        {loading && (
          <p className="specials-status" role="status" aria-live="polite">
            Loading specials…
          </p>
        )}

        {error && (
          <p className="specials-status specials-error" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && specials && (
          <div className="specials-grid">
            {specials.map((item) => (
              <div className="special-card" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="special-card-body">
                  <div className="special-card-title">
                    <span>{item.name}</span>
                    <span className="special-price">${item.price.toFixed(2)}</span>
                  </div>
                  <p>{item.description}</p>
                  <a href="/menu">Order a delivery →</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
