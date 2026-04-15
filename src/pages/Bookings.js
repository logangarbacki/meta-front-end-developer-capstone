import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchMyBookings } from "../api/api";
import "./Bookings.css";

const STATUS_COLORS = {
  confirmed: { bg: "#e6f4f1", color: "#1e7a5e", label: "Confirmed" },
  pending:   { bg: "#fff8e1", color: "#a07800", label: "Pending" },
  cancelled: { bg: "#fdecea", color: "#c0392b", label: "Cancelled" },
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
}

function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function Bookings() {
  const { isLoggedIn, token, username } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => { document.title = "My Bookings | Little Lemon"; }, []);

  useEffect(() => {
    if (!token) return;
    fetchMyBookings(token)
      .then(setBookings)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [token]);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const upcoming = bookings.filter(b => new Date(b.booking_date) >= new Date() && b.status !== "cancelled");
  const past = bookings.filter(b => new Date(b.booking_date) < new Date() || b.status === "cancelled");

  return (
    <main className="bookings-page">
      <div className="bookings-header">
        <div>
          <p className="bookings-eyebrow">Your account</p>
          <h2>My Bookings</h2>
          <p className="bookings-sub">Welcome back, <strong>{username}</strong>. Here are your reservations.</p>
        </div>
        <Link to="/reserve" className="bookings-new-btn">+ New Reservation</Link>
      </div>

      {loading && (
        <div className="bookings-loading">
          {[1,2,3].map(n => <div key={n} className="booking-skeleton" />)}
        </div>
      )}

      {error && (
        <div className="bookings-error">
          <p>Could not load bookings. Please try again later.</p>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="bookings-empty">
          <div className="bookings-empty-icon">📅</div>
          <h3>No reservations yet</h3>
          <p>You haven't made any reservations. Book a table and we'll see you soon!</p>
          <Link to="/reserve" className="bookings-new-btn">Reserve a Table</Link>
        </div>
      )}

      {!loading && !error && upcoming.length > 0 && (
        <section className="bookings-section">
          <h3 className="bookings-section-title">Upcoming</h3>
          <div className="bookings-list">
            {upcoming.map(b => <BookingCard key={b.id} booking={b} />)}
          </div>
        </section>
      )}

      {!loading && !error && past.length > 0 && (
        <section className="bookings-section">
          <h3 className="bookings-section-title">Past & Cancelled</h3>
          <div className="bookings-list">
            {past.map(b => <BookingCard key={b.id} booking={b} muted />)}
          </div>
        </section>
      )}
    </main>
  );
}

function BookingCard({ booking, muted }) {
  const status = STATUS_COLORS[booking.status] || STATUS_COLORS.pending;
  return (
    <div className={`booking-card${muted ? " booking-card--muted" : ""}`}>
      <div className="booking-card-date">
        <span className="booking-day">{new Date(booking.booking_date).getDate()}</span>
        <span className="booking-month">
          {new Date(booking.booking_date).toLocaleString("en-US", { month: "short" })}
        </span>
      </div>
      <div className="booking-card-info">
        <p className="booking-name">{booking.name}</p>
        <p className="booking-details">
          {formatDate(booking.booking_date)} · {formatTime(booking.booking_date)}
        </p>
        <p className="booking-guests">{booking.no_of_guests} guest{booking.no_of_guests !== 1 ? "s" : ""}</p>
      </div>
      <span
        className="booking-status"
        style={{ background: status.bg, color: status.color }}
      >
        {status.label}
      </span>
    </div>
  );
}

export default Bookings;
