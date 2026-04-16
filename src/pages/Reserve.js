import { useState, useReducer, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { initializeTimes, updateTimes } from "../utils/bookingUtils";
import { submitAPI } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useConfetti } from "../hooks/useConfetti";
import "./Reserve.css";

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
    dispatch({ type: "UPDATE_DATE", payload: date });
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
    <main className="reserve">
      {error && <p className="reserve-error" role="alert">{error}</p>}
      <BookingForm
        availableTimes={availableTimes}
        onDateChange={handleDateChange}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </main>
  );
}

export default Reserve;
