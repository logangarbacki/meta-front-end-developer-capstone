import { useState, useEffect, useCallback } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { fetchMyBookings, cancelBooking } from "../api/api";
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

const REWARDS = [
  { id: 1, pts: 50,  label: "Free Dessert",    desc: "Any dessert on us",          code: "DESSERT50"  },
  { id: 2, pts: 100, label: "10% Off Order",   desc: "10% off your next delivery", code: "LOYAL100"   },
  { id: 3, pts: 200, label: "Free Delivery",   desc: "No delivery fee next order", code: "SHIP200"    },
  { id: 4, pts: 350, label: "20% Off Order",   desc: "20% off your next delivery", code: "LOYAL350"   },
  { id: 5, pts: 500, label: "Free Meal",       desc: "One entrée on the house",    code: "MEAL500"    },
];

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
  const { orders, loyaltyPoints } = useOrders();
  const { addItem, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [tab, setTab] = useState("reservations");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);
  const [claimedRewards, setClaimedRewards] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ll_claimed_rewards")) || []; } catch { return []; }
  });

  const claimReward = useCallback((reward) => {
    setClaimedRewards((prev) => {
      const next = [...prev, reward.id];
      localStorage.setItem("ll_claimed_rewards", JSON.stringify(next));
      return next;
    });
    addToast(`Reward claimed! Use code ${reward.code} at checkout.`);
  }, [addToast]);

  useEffect(() => { document.title = "My Account | Little Lemon"; }, []);

  useEffect(() => {
    if (!token) return;
    fetchMyBookings(token)
      .then(setBookings)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [token]);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this reservation?")) return;
    setCancellingId(id);
    try {
      await cancelBooking(id, token);
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: "cancelled" } : b));
      addToast("Reservation cancelled.");
    } catch {
      addToast("Could not cancel. Please try again.", "error");
    } finally {
      setCancellingId(null);
    }
  };

  const handleReorder = (order) => {
    clearCart();
    order.items.forEach((item) => addItem(item));
    addToast(`${order.items.length} item${order.items.length !== 1 ? "s" : ""} added to cart`);
    navigate("/checkout");
  };

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
          {loyaltyPoints > 0 && (
            <div className="loyalty-badge">
              <span className="loyalty-icon">⭐</span>
              <span><strong>{loyaltyPoints.toLocaleString()} pts</strong> — Loyalty Rewards</span>
            </div>
          )}
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
        <button
          className={`bookings-tab${tab === "rewards" ? " bookings-tab--active" : ""}`}
          onClick={() => setTab("rewards")}
        >
          Rewards
          {loyaltyPoints > 0 && <span className="bookings-tab-badge">{loyaltyPoints} pts</span>}
        </button>
      </div>

      {/* ── Reservations tab ── */}
      {tab === "reservations" && (
        <div className="bookings-tab-content">
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
                {upcoming.map(b => <BookingCard key={b.id} booking={b} onCancel={handleCancel} cancelling={cancellingId === b.id} />)}
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
        </div>
      )}

      {/* ── Rewards tab ── */}
      {tab === "rewards" && (
        <div className="bookings-tab-content">
          <div className="rewards-header">
            <div className="rewards-pts-display">
              <span className="rewards-pts-number">{loyaltyPoints.toLocaleString()}</span>
              <span className="rewards-pts-label">points available</span>
            </div>
            <p className="rewards-hint">Earn 10 pts per $1 spent on delivered orders. Claim rewards below.</p>
          </div>
          <div className="rewards-grid">
            {REWARDS.map((reward) => {
              const canClaim = loyaltyPoints >= reward.pts;
              const claimed = claimedRewards.includes(reward.id);
              return (
                <div key={reward.id} className={`reward-card${!canClaim ? " reward-card--locked" : ""}${claimed ? " reward-card--claimed" : ""}`}>
                  <div className="reward-card-pts">{reward.pts} pts</div>
                  <h3 className="reward-card-title">{reward.label}</h3>
                  <p className="reward-card-desc">{reward.desc}</p>
                  {claimed ? (
                    <div className="reward-code">Code: <strong>{reward.code}</strong></div>
                  ) : (
                    <button
                      className="reward-claim-btn"
                      disabled={!canClaim}
                      onClick={() => claimReward(reward)}
                    >
                      {canClaim ? "Claim" : `Need ${reward.pts - loyaltyPoints} more pts`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Orders tab ── */}
      {tab === "orders" && (
        <div className="bookings-tab-content">
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
              {orders.map(order => <OrderCard key={order.id} order={order} onReorder={handleReorder} />)}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

function BookingCard({ booking, muted, onCancel, cancelling }) {
  const status = STATUS_COLORS[booking.status] || STATUS_COLORS.pending;
  const isUpcoming = booking.status !== "cancelled" && new Date(booking.booking_date) >= new Date();
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
      <div className="booking-card-right">
        <span className="booking-status" style={{ background: status.bg, color: status.color }}>
          {status.label}
        </span>
        {isUpcoming && onCancel && (
          <button
            className="booking-cancel-btn"
            onClick={() => onCancel(booking.id)}
            disabled={cancelling}
          >
            {cancelling ? "Cancelling…" : "Cancel"}
          </button>
        )}
      </div>
    </div>
  );
}

const TRACKING_STEPS = [
  { key: "preparing", label: "Preparing" },
  { key: "on_the_way", label: "On the Way" },
  { key: "delivered", label: "Delivered" },
];

function TrackingBar({ status }) {
  const currentIndex = TRACKING_STEPS.findIndex((s) => s.key === status);
  return (
    <div className="tracking-bar">
      {TRACKING_STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={step.key} className="tracking-step">
            <div className={`tracking-node${done ? " tracking-node--done" : active ? " tracking-node--active" : ""}`}>
              {done ? "✓" : i + 1}
            </div>
            <span className={`tracking-label${active ? " tracking-label--active" : done ? " tracking-label--done" : ""}`}>
              {step.label}
            </span>
            {i < TRACKING_STEPS.length - 1 && (
              <div className={`tracking-line${done ? " tracking-line--done" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderCard({ order, onReorder }) {
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
        <TrackingBar status={order.status} />
      </div>
      <div className="order-card-right">
        <span className="booking-status" style={{ background: status.bg, color: status.color }}>
          {status.label}
        </span>
        <span className="order-total">${order.total.toFixed(2)}</span>
        <button className="booking-reorder-btn" onClick={() => onReorder(order)}>Reorder</button>
      </div>
    </div>
  );
}

export default Bookings;
