import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const today = new Date().toISOString().split("T")[0];

const BookingForm = ({ availableTimes, onSubmit, submitting }) => {
  const { username } = useAuth();
  const [form, setForm] = useState({
    name: username || "",
    email: "",
    date: "",
    time: "",
    guests: 1,
    occasion: "",
    seating: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <section>
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
              min={today}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <select id="time" name="time" value={form.time} onChange={handleChange} required>
              <option value="">Select a time</option>
              {availableTimes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
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

        <div className="form-group">
          <label htmlFor="seating">Seating Preference (optional)</label>
          <select id="seating" name="seating" value={form.seating} onChange={handleChange}>
            <option value="">No preference</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor / Patio">Outdoor / Patio</option>
            <option value="Bar">Bar</option>
            <option value="Private Room">Private Room</option>
          </select>
        </div>

        <button type="submit" className="reserve-btn" disabled={submitting}>
          {submitting ? "Reserving..." : "Reserve Table"}
        </button>
      </form>
    </section>
  );
};

export default BookingForm;
