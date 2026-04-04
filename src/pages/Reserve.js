import { useState } from "react";
import "./Reserve.css";


function Reserve() {
  const [form, setForm] = useState({
    date: "",
    time: "",
    guests: 1,
    occasion: "",
    name: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };


  if (submitted) {
    return (
      <main className="reserve">
        <div className="reserve-success">
          <h2>Reservation Confirmed!</h2>
          <p>
            Thank you, <strong>{form.name}</strong>! We've reserved a table for{" "}
            <strong>{form.guests}</strong> guest{form.guests > 1 ? "s" : ""} on{" "}
            <strong>{form.date}</strong> at <strong>{form.time}</strong>.
          </p>
          <p>A confirmation will be sent to <strong>{form.email}</strong>.</p>
          <button onClick={() => setSubmitted(false)} className="reserve-btn">
            Make Another Reservation
          </button>
        </div>
      </main>
    );
  }


  return (
    <main className="reserve">
      <h2>Reserve a Table</h2>
      <form className="reserve-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
            />
          </div>
        </div>


        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <select id="time" name="time" value={form.time} onChange={handleChange} required>
              <option value="">Select a time</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="5:30 PM">5:30 PM</option>
              <option value="6:00 PM">6:00 PM</option>
              <option value="6:30 PM">6:30 PM</option>
              <option value="7:00 PM">7:00 PM</option>
              <option value="7:30 PM">7:30 PM</option>
              <option value="8:00 PM">8:00 PM</option>
              <option value="8:30 PM">8:30 PM</option>
              <option value="9:00 PM">9:00 PM</option>
            </select>
          </div>
        </div>


        <div className="form-row">
          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="10"
              value={form.guests}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="occasion">Occasion (optional)</label>
            <select id="occasion" name="occasion" value={form.occasion} onChange={handleChange}>
              <option value="">None</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Business Meal">Business Meal</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>


        <button type="submit" className="reserve-btn">
          Reserve Table
        </button>
      </form>
    </main>
  );
}


export default Reserve;



