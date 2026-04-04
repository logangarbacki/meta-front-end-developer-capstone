import { useState, useReducer } from "react";
import BookingForm from "../components/BookingForm";
import { initializeTimes, updateTimes } from "../utils/bookingUtils";
import "./Reserve.css";

function Reserve() {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleDateChange = (date) => {
    dispatch({ type: "UPDATE_DATE", payload: date });
  };

  const handleSubmit = (form) => {
    setFormData(form);
    setSubmitted(true);
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
      <BookingForm
        availableTimes={availableTimes}
        onDateChange={handleDateChange}
        onSubmit={handleSubmit}
      />
    </main>
  );
}

export default Reserve;
