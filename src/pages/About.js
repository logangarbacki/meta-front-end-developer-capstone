import marioAndAdrianA from "../assets/Mario and Adrian A.jpg";
import marioAndAdrianB from "../assets/Mario and Adrian b.jpg";
import "./About.css";

function About() {
  return (
    <main className="about"aria-label="About Little Lemon restaurant">
      <section className="about-content">
        <div className="about-text">
          <header>
            <h2>Little Lemon</h2>
            <h3>Chicago</h3>
          </header>
            <p>
              Little Lemon is owned by two Italian brothers, Mario and Adrian, who
              moved to the United States to pursue their shared dream of owning a
              restaurant. To craft an authentic menu, the brothers have spent years
              researching traditional Mediterranean recipes.
            </p>
            <p>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist. Our goal is to bring
              the flavors of the Mediterranean coast to the heart of Chicago.
            </p>
        </div>
        <div className="about-images">
          <img src={marioAndAdrianA} alt="Mario and Adrian" className="about-img-top" />
          <img src={marioAndAdrianB} alt="Mario and Adrian cooking" className="about-img-bottom" />
        </div>
      </section>
    </main>
  );
}

export default About;
