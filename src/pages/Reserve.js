import { useState, useReducer, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { initializeTimes, updateTimes } from "../utils/bookingUtils";
import { submitAPI } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useConfetti } from "../hooks/useConfetti";
import "./Reserve.css";

const INFO_ITEMS = [
  { icon: "🕐", label: "Hours", detail: "Mon–Thu 11am–10pm · Fri–Sat 11am–11pm · Sun 12pm–9pm" },
  { icon: "📍", label: "Location", detail: "123 Lemon Street, Chicago, IL 60601" },
  { icon: "📞", label: "Phone", detail: "(312) 555-0198" },
  { icon: "❌", label: "Cancellation", detail: "Free cancellation up to 2 hours before your reservation" },
  { icon: "👗", label: "Dress Code", detail: "Smart casual — come as you are" },
];

function Reserve() {
  const { isLoggedIn, token } = useAuth();
  const launchConfetti = useConfetti();
  useEffect(() => { document.title = "Reserve a Table | Little Lemon"; }, []);
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const handleDateChange = (date) => {
    if (date) dispatch({ type: "UPDATE_DATE", payload: date });
  };

  const handleSubmit = async (form) => {
    setSubmitting(true);
    setError(null);
    try {
      await submitAPI(form, token);
      setFormData(form);
      setSubmitted(true);
      launchConfetti();
    } catch (err) {
      const msg =
        err?.booking_date?.[0] ||
        err?.non_field_errors?.[0] ||
        err?.detail ||
        "Booking failed. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && formData) {
    return (
      <main className="reserve" aria-label="Reservation confirmation page">
        <div className="reserve-success">
          <div className="reserve-success-icon">✓</div>
          <h2 aria-live="polite">Reservation Confirmed!</h2>
          <p>Thank you, <strong>{formData.name}</strong>! We can't wait to see you.</p>
          <div className="reserve-success-card">
            <div className="reserve-success-row">
              <span>Date</span>
              <strong>{formData.date}</strong>
            </div>
            <div className="reserve-success-row">
              <span>Time</span>
              <strong>{formData.time}</strong>
            </div>
            <div className="reserve-success-row">
              <span>Guests</span>
              <strong>{formData.guests} guest{formData.guests > 1 ? "s" : ""}</strong>
            </div>
            {formData.occasion && (
              <div className="reserve-success-row">
                <span>Occasion</span>
                <strong>{formData.occasion}</strong>
              </div>
            )}
            {formData.seating && (
              <div className="reserve-success-row">
                <span>Seating</span>
                <strong>{formData.seating}</strong>
              </div>
            )}
            {formData.requests && (
              <div className="reserve-success-row">
                <span>Requests</span>
                <strong>{formData.requests}</strong>
              </div>
            )}
          </div>
          <p className="reserve-success-note">Confirmation sent to <strong>{formData.email}</strong></p>
          <div className="reserve-success-actions">
            <Link to="/bookings" className="reserve-btn">View My Reservations</Link>
            <button onClick={() => setSubmitted(false)} className="reserve-btn reserve-btn--outline">
              Make Another
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="reserve-page" aria-label="Reserve a table">
      <div className="reserve-split">

        <aside className="reserve-panel">
          <p className="reserve-panel-eyebrow">Little Lemon</p>
          <h2 className="reserve-panel-title">Reserve a Table</h2>
          <p className="reserve-panel-sub">
            Join us for an unforgettable Mediterranean dining experience. We look forward to welcoming you.
          </p>

          <ul className="reserve-info-list">
            {INFO_ITEMS.map((item) => (
              <li key={item.label} className="reserve-info-item">
                <span className="reserve-info-icon">{item.icon}</span>
                <div>
                  <p className="reserve-info-label">{item.label}</p>
                  <p className="reserve-info-detail">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="reserve-panel-badge">
            <span>⭐</span>
            <span>4.8 · 2,400+ reviews on Google</span>
          </div>
        </aside>

        <div className="reserve-form-wrap">
          {error && <p className="reserve-error" role="alert">{error}</p>}
          <BookingForm
            availableTimes={availableTimes}
            onDateChange={handleDateChange}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </div>

      </div>
    </main>
  );
}

export default Reserve;
