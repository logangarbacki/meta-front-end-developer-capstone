import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Events.css";

const EVENTS = [
  {
    id: 1,
    date: "Every Friday",
    title: "Live Jazz Night",
    time: "7:00 PM – 10:00 PM",
    description: "Unwind with live jazz from local Chicago musicians. Enjoy our full menu and handcrafted cocktails while the music plays.",
    tag: "Music",
    color: "#e3f0ff",
    tagColor: "#1a5faa",
  },
  {
    id: 2,
    date: "Every Tuesday",
    title: "Happy Hour",
    time: "4:00 PM – 6:30 PM",
    description: "50% off all cocktails and house wine. Pair with our Starters menu for the perfect after-work unwind.",
    tag: "Drinks",
    color: "#fff8e1",
    tagColor: "#a07800",
  },
  {
    id: 3,
    date: "Every Sunday",
    title: "Mediterranean Brunch",
    time: "11:00 AM – 3:00 PM",
    description: "Our Sunday Brunch features a curated selection of mezze, pastries, fresh juices, and bottomless mimosas.",
    tag: "Brunch",
    color: "#e6f4f1",
    tagColor: "#1e7a5e",
  },
  {
    id: 4,
    date: "Last Saturday of the Month",
    title: "Chef's Table Experience",
    time: "7:30 PM – 10:00 PM",
    description: "A 6-course tasting menu designed by our head chef, paired with curated wines. Limited to 12 guests. Reservation required.",
    tag: "Special",
    color: "#fdecea",
    tagColor: "#c0392b",
  },
  {
    id: 5,
    date: "Every Wednesday",
    title: "Wine & Dine",
    time: "6:00 PM – 9:00 PM",
    description: "A rotating selection of Mediterranean wines, each paired with a small plate from our kitchen. Hosted by our sommelier.",
    tag: "Wine",
    color: "#f5e6ff",
    tagColor: "#6b3fa0",
  },
  {
    id: 6,
    date: "Thursdays in Summer",
    title: "Patio BBQ",
    time: "5:30 PM – 9:00 PM",
    description: "Fire up the summer on our outdoor patio. Grilled specials, local craft beers, and live acoustic guitar every Thursday.",
    tag: "Seasonal",
    color: "#fff3e0",
    tagColor: "#e65100",
  },
];

function Events() {
  useEffect(() => { document.title = "Events | Little Lemon"; }, []);

  return (
    <main className="events-page">
      <div className="events-hero">
        <p className="events-eyebrow">Little Lemon</p>
        <h2>Events & Specials</h2>
        <p className="events-sub">Something's always happening at Little Lemon. Join us for food, music, and good company.</p>
      </div>

      <div className="events-grid">
        {EVENTS.map((ev) => (
          <div key={ev.id} className="event-card">
            <div className="event-card-top">
              <span className="event-tag" style={{ background: ev.color, color: ev.tagColor }}>{ev.tag}</span>
              <p className="event-date">{ev.date}</p>
            </div>
            <h3 className="event-title">{ev.title}</h3>
            <p className="event-time">{ev.time}</p>
            <p className="event-desc">{ev.description}</p>
            <Link to="/reserve" className="event-reserve-btn">Reserve a Table →</Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Events;
