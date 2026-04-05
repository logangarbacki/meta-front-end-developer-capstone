import { useState } from "react";
import BookingForm from "../components/BookingForm";
import { getAvailableTimes, submitReservation } from "../services/reservationService";
import { useFetch } from "../hooks/useFetch";
import "./Reserve.css";

function Reserve() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    data: availableTimes,
    loading: timesLoading,
    error: timesError,
  } = useFetch(() => getAvailableTimes(selectedDate), [selectedDate]);

  const handleDateChange = (dateStr) => {
    setSelectedDate(new Date(dateStr));
  };

  const handleSubmit = async (form) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitReservation(form);
      setFormData(form);
      setSubmitted(true);
    } catch {
      setSubmitError("Failed to submit reservation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && formData) {
    return (
      <main className="reserve" aria-label="Reservation confirmation page">
        <div className="reserve-success">
          <h2 aria-live="polite">Reservation Confirmed!</h2>
          <p>
            Thank you, <strong>{formData.name}</strong>! We've reserved a table
            for <strong>{formData.guests}</strong> guest
            {formData.guests > 1 ? "s" : ""} on <strong>{formData.date}</strong>{" "}
            at <strong>{formData.time}</strong>.
          </p>
          <p>
            A confirmation will be sent to <strong>{formData.email}</strong>.
          </p>
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
        availableTimes={availableTimes ?? []}
        timesLoading={timesLoading}
        timesError={timesError}
        onDateChange={handleDateChange}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitError={submitError}
      />
    </main>
  );
}

export default Reserve;
