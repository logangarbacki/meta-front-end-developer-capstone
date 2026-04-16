import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const today = new Date().toISOString().split("T")[0];

const OCCASIONS = [
  { value: "",             label: "None",         icon: "✦" },
  { value: "Birthday",    label: "Birthday",      icon: "🎂" },
  { value: "Anniversary", label: "Anniversary",   icon: "💍" },
  { value: "Business Meal", label: "Business",    icon: "💼" },
  { value: "Other",       label: "Other",         icon: "✨" },
];

const SEATING = [
  { value: "",               label: "No Pref",  icon: "✦" },
  { value: "Indoor",         label: "Indoor",   icon: "🏛" },
  { value: "Outdoor / Patio", label: "Patio",   icon: "☀️" },
  { value: "Bar",            label: "Bar",      icon: "🍸" },
  { value: "Private Room",   label: "Private",  icon: "🔒" },
];

const BookingForm = ({ availableTimes, onDateChange, onSubmit, submitting }) => {
  const { username } = useAuth();
  const [form, setForm] = useState({
    name: username || "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    occasion: "",
    seating: "",
    requests: "",
  });

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleDateChange = (e) => {
    set("date", e.target.value);
    set("time", "");
    if (onDateChange) onDateChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  const limitedAvailability = availableTimes.length > 0 && availableTimes.length <= 3;

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>

      <div className="bf-section">
        <label className="bf-label">Date</label>
        <input
          className="bf-input"
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={handleDateChange}
          min={today}
          required
          aria-required="true"
        />
        {limitedAvailability && (
          <p className="bf-availability-warn">Limited availability — only {availableTimes.length} slot{availableTimes.length !== 1 ? "s" : ""} left</p>
        )}
      </div>

      {form.date && (
        <div className="bf-section">
          <label className="bf-label">Time</label>
          {availableTimes.length === 0 ? (
            <p className="bf-no-times">No availability on this date. Please try another.</p>
          ) : (
            <div className="bf-time-grid" role="group" aria-label="Available times">
              {availableTimes.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`bf-time-slot${form.time === t ? " bf-time-slot--active" : ""}`}
                  onClick={() => set("time", t)}
                  aria-pressed={form.time === t}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
          <input type="hidden" name="time" value={form.time} required />
        </div>
      )}

      <div className="bf-section">
        <label className="bf-label">Guests</label>
        <div className="bf-stepper" role="group" aria-label="Number of guests">
          <button
            type="button"
            className="bf-stepper-btn"
            onClick={() => set("guests", Math.max(1, form.guests - 1))}
            aria-label="Decrease guests"
            disabled={form.guests <= 1}
          >−</button>
          <span className="bf-stepper-count" aria-live="polite" aria-atomic="true">
            {form.guests} <span className="bf-stepper-label">guest{form.guests !== 1 ? "s" : ""}</span>
          </span>
          <button
            type="button"
            className="bf-stepper-btn"
            onClick={() => set("guests", Math.min(10, form.guests + 1))}
            aria-label="Increase guests"
            disabled={form.guests >= 10}
          >+</button>
        </div>
        <p className="bf-stepper-hint">Maximum 10 guests. For larger groups, call us.</p>
      </div>

      <div className="bf-section">
        <label className="bf-label">Occasion <span className="bf-optional">(optional)</span></label>
        <div className="bf-cards" role="group" aria-label="Occasion">
          {OCCASIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              className={`bf-card${form.occasion === o.value ? " bf-card--active" : ""}`}
              onClick={() => set("occasion", o.value)}
              aria-pressed={form.occasion === o.value}
            >
              <span className="bf-card-icon">{o.icon}</span>
              <span className="bf-card-label">{o.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bf-section">
        <label className="bf-label">Seating <span className="bf-optional">(optional)</span></label>
        <div className="bf-cards" role="group" aria-label="Seating preference">
          {SEATING.map((s) => (
            <button
              key={s.value}
              type="button"
              className={`bf-card${form.seating === s.value ? " bf-card--active" : ""}`}
              onClick={() => set("seating", s.value)}
              aria-pressed={form.seating === s.value}
            >
              <span className="bf-card-icon">{s.icon}</span>
              <span className="bf-card-label">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bf-divider" />

      <div className="bf-row">
        <div className="bf-section">
          <label className="bf-label" htmlFor="name">Full Name</label>
          <input
            className="bf-input"
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Jane Doe"
            required
            aria-required="true"
          />
        </div>
        <div className="bf-section">
          <label className="bf-label" htmlFor="email">Email</label>
          <input
            className="bf-input"
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="jane@example.com"
            required
            aria-required="true"
          />
        </div>
      </div>

      <div className="bf-section">
        <label className="bf-label" htmlFor="phone">Phone <span className="bf-optional">(optional)</span></label>
        <input
          className="bf-input"
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="(312) 555-0198"
        />
      </div>

      <div className="bf-section">
        <label className="bf-label" htmlFor="requests">Special Requests <span className="bf-optional">(optional)</span></label>
        <textarea
          className="bf-input bf-textarea"
          id="requests"
          name="requests"
          value={form.requests}
          onChange={(e) => set("requests", e.target.value)}
          placeholder="Allergies, high chair needed, window table preference…"
          rows={3}
          maxLength={300}
        />
        <p className="bf-char-count">{form.requests.length}/300</p>
      </div>

      <button
        type="submit"
        className="bf-submit"
        disabled={submitting || !form.date || !form.time || !form.name || !form.email}
      >
        {submitting ? "Confirming…" : "Confirm Reservation"}
      </button>
    </form>
  );
};

export default BookingForm;
