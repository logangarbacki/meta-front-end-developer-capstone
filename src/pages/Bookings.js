import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import { fetchMyBookings } from "../api/api";
import "./Bookings.css";

const STATUS_COLORS = {
  confirmed: { bg: "#e6f4f1", color: "#1e7a5e", label: "Confirmed" },
  pending:   { bg: "#fff8e1", color: "#a07800", label: "Pending" },
  cancelled: { bg: "#fdecea", color: "#c0392b", label: "Cancelled" },
};

const ORDER_STATUS_COLORS = {
  preparing: { bg: "#fff8e1", color: "#a07800", label: "Preparing" },
  on_the_way: { bg: "#e3f0ff", color: "#1a5faa", label: "On the Way" },
  delivered:  { bg: "#e6f4f1", color: "#1e7a5e", label: "Delivered" },
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short", month: "long", day: "numeric", year: "numeric",
  });
}

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit",
  });
}

function Bookings() {
  const { isLoggedIn, token, username } = useAuth();
  const { orders } = useOrders();
  const [tab, setTab] = useState("reservations");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => { document.title = "My Account | Little Lemon"; }, []);

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
          <h2>Hi, {username}</h2>
          <p className="bookings-sub">Manage your reservations and delivery orders.</p>
        </div>
        <div className="bookings-header-actions">
          <Link to="/reserve" className="bookings-action-btn">+ Reservation</Link>
          <Link to="/menu" className="bookings-action-btn bookings-action-btn--outline">+ Order Food</Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="bookings-tabs">
        <button
          className={`bookings-tab${tab === "reservations" ? " bookings-tab--active" : ""}`}
          onClick={() => setTab("reservations")}
        >
          Reservations
          {bookings.length > 0 && <span className="bookings-tab-badge">{bookings.length}</span>}
        </button>
        <button
          className={`bookings-tab${tab === "orders" ? " bookings-tab--active" : ""}`}
          onClick={() => setTab("orders")}
        >
          Orders
          {orders.length > 0 && <span className="bookings-tab-badge">{orders.length}</span>}
        </button>
      </div>

      {/* ── Reservations tab ── */}
      {tab === "reservations" && (
        <>
          {loading && (
            <div className="bookings-loading">
              {[1,2,3].map(n => <div key={n} className="booking-skeleton" />)}
            </div>
          )}

          {error && <div className="bookings-error"><p>Could not load reservations. Please try again later.</p></div>}

          {!loading && !error && bookings.length === 0 && (
            <div className="bookings-empty">
              <div className="bookings-empty-icon">📅</div>
              <h3>No reservations yet</h3>
              <p>Book a table and we'll see you soon!</p>
              <Link to="/reserve" className="bookings-action-btn">Reserve a Table</Link>
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
        </>
      )}

      {/* ── Orders tab ── */}
      {tab === "orders" && (
        <>
          {orders.length === 0 && (
            <div className="bookings-empty">
              <div className="bookings-empty-icon">🍋</div>
              <h3>No orders yet</h3>
              <p>Order from our menu and your delivery history will appear here.</p>
              <Link to="/menu" className="bookings-action-btn">Browse Menu</Link>
            </div>
          )}

          {orders.length > 0 && (
            <div className="bookings-list">
              {orders.map(order => <OrderCard key={order.id} order={order} />)}
            </div>
          )}
        </>
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
        <p className="booking-details">{formatDate(booking.booking_date)} · {formatTime(booking.booking_date)}</p>
        <p className="booking-guests">{booking.no_of_guests} guest{booking.no_of_guests !== 1 ? "s" : ""}</p>
      </div>
      <span className="booking-status" style={{ background: status.bg, color: status.color }}>
        {status.label}
      </span>
    </div>
  );
}

function OrderCard({ order }) {
  const status = ORDER_STATUS_COLORS[order.status] || ORDER_STATUS_COLORS.preparing;
  return (
    <div className="booking-card order-card">
      <div className="booking-card-date order-card-icon">
        <span style={{ fontSize: 22 }}>🛒</span>
      </div>
      <div className="booking-card-info">
        <p className="booking-name">Order #{order.orderNumber}</p>
        <p className="booking-details">
          {formatDate(order.placedAt)} · {order.items.length} item{order.items.length !== 1 ? "s" : ""}
        </p>
        <p className="booking-guests order-address">📍 {order.address}</p>
        <div className="order-items-list">
          {order.items.map((item, i) => (
            <span key={i} className="order-item-chip">{item.title} ×{item.qty}</span>
          ))}
        </div>
      </div>
      <div className="order-card-right">
        <span className="booking-status" style={{ background: status.bg, color: status.color }}>
          {status.label}
        </span>
        <span className="order-total">${order.total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default Bookings;
