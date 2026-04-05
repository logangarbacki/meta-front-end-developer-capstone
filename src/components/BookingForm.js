import { useState } from "react";

const BookingForm = ({
  availableTimes,
  timesLoading,
  timesError,
  onDateChange,
  onSubmit,
  submitting,
  submitError,
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: 1,
    occasion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "date" && onDateChange) {
      onDateChange(value);
    }
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            {timesLoading ? (
              <p role="status" aria-live="polite" style={{ margin: 0, fontSize: "14px", color: "#777" }}>
                Loading available times…
              </p>
            ) : timesError ? (
              <p role="alert" style={{ margin: 0, fontSize: "14px", color: "#c0392b" }}>
                {timesError}
              </p>
            ) : (
              <select id="time" name="time" value={form.time} onChange={handleChange} required>
                <option value="">Select a time</option>
                {availableTimes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            )}
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
            <select
              id="occasion"
              name="occasion"
              value={form.occasion}
              onChange={handleChange}
            >
              <option value="">None</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Business Meal">Business Meal</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {submitError && (
          <p role="alert" style={{ color: "#c0392b", fontSize: "14px", margin: 0 }}>
            {submitError}
          </p>
        )}

        <button type="submit" className="reserve-btn" disabled={submitting}>
          {submitting ? "Reserving…" : "Reserve Table"}
        </button>
      </form>
    </section>
  );
};

export default BookingForm;
