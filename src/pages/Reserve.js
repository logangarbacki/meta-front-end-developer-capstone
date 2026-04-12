import { useState, useReducer, useEffect } from "react";
import { Navigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { initializeTimes, updateTimes } from "../utils/bookingUtils";
import { submitAPI } from "../api/api";
import { useAuth } from "../context/AuthContext";
import "./Reserve.css";

function Reserve() {
  const { isLoggedIn } = useAuth();
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
    const success = await submitAPI(form);
    setSubmitting(false);
    if (success) {
      setFormData(form);
      setSubmitted(true);
    } else {
      setError("Booking failed. Please try again.");
    }
  };

  if (submitted && formData) {
    return (
      <main className="reserve" aria-label="Reservation confirmation page">
        <div className="reserve-success">
          <h2 aria-live="polite">Reservation Confirmed!</h2>
          <p>
            Thank you, <strong>{formData.name}</strong>! We've reserved a table for{" "}
            <strong>{formData.guests}</strong> guest{formData.guests > 1 ? "s" : ""} on{" "}
            <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
          </p>
          <p>A confirmation will be sent to <strong>{formData.email}</strong>.</p>
          <button onClick={() => setSubmitted(false)} className="reserve-btn">
            Make Another Reservation
          </button>
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
