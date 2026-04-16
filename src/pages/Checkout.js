import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useConfetti } from "../hooks/useConfetti";
import "./Checkout.css";

const DELIVERY_FEE = 3.99;
const ESTIMATED_MINS = () => Math.floor(25 + Math.random() * 20);
const PROMO_CODES = { LEMON10: 0.10, WELCOME5: 0.05 };
const TIP_OPTIONS = [0, 15, 18, 20];

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { addToast } = useToast();
  const { username } = useAuth();
  const launchConfetti = useConfetti();
  useEffect(() => { document.title = "Checkout | Little Lemon"; }, []);

  const [form, setForm] = useState({
    name: username || "", email: "",
    street: "", city: "", state: "", zip: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [savedOrder, setSavedOrder] = useState(null);
  const [tipPct, setTipPct] = useState(0);
  const [customTip, setCustomTip] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError, setPromoError] = useState("");

  const tipAmount = tipPct === "custom"
    ? (parseFloat(customTip) || 0)
    : (totalPrice * tipPct / 100);
  const discount = promoApplied ? totalPrice * PROMO_CODES[promoApplied] : 0;
  const grandTotal = totalPrice + DELIVERY_FEE + tipAmount - discount;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoApplied(code);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code.");
      setPromoApplied(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const eta = ESTIMATED_MINS();
    const order = {
      id: orderNumber,
      orderNumber,
      items: [...items],
      subtotal: totalPrice,
      deliveryFee: DELIVERY_FEE,
      tip: tipAmount,
      discount,
      total: grandTotal,
      address: `${form.street}, ${form.city}, ${form.state} ${form.zip}`,
      name: form.name,
      email: form.email,
      placedAt: new Date().toISOString(),
      status: "preparing",
      eta,
    };
    addOrder(order);
    clearCart();
    setSavedOrder(order);
    setConfirmed(true);
    launchConfetti();
    addToast(`Order #${orderNumber} placed! Arriving in ~${eta} mins`);
  };

  if (items.length === 0 && !confirmed) {
    return (
      <main className="checkout">
        <div className="checkout-empty">
          <div className="checkout-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some items from our menu first.</p>
          <Link to="/menu" className="checkout-btn">Browse Menu</Link>
        </div>
      </main>
    );
  }

  if (confirmed && savedOrder) {
    return (
      <main className="checkout">
        <div className="checkout-confirmed">
          <div className="checkout-confirmed-icon">✓</div>
          <h2>Order Placed!</h2>
          <p>Thank you, <strong>{savedOrder.name}</strong>! Your order <strong>#{savedOrder.orderNumber}</strong> is being prepared.</p>
          <div className="checkout-confirmed-card">
            <div className="checkout-confirmed-row">
              <span>Delivering to</span>
              <span>{savedOrder.address}</span>
            </div>
            <div className="checkout-confirmed-row">
              <span>Estimated arrival</span>
              <strong>~{savedOrder.eta} minutes</strong>
            </div>
            <div className="checkout-confirmed-row">
              <span>Total charged</span>
              <strong>${savedOrder.total.toFixed(2)}</strong>
            </div>
          </div>
          <p className="checkout-confirmed-note">Confirmation sent to <strong>{savedOrder.email}</strong></p>
          <div className="checkout-confirmed-actions">
            <Link to="/bookings" className="checkout-btn">View My Orders</Link>
            <Link to="/menu" className="checkout-btn checkout-btn--outline">Back to Menu</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-layout">

        {/* Order summary */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <ul className="checkout-items">
            {items.map((item) => (
              <li key={item.id} className="checkout-item">
                <span className="checkout-item-name">{item.title} <em>× {item.qty}</em></span>
                <span>${(parseFloat(item.price) * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-subtotals">
            <div className="checkout-subtotal-row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="checkout-subtotal-row">
              <span>Delivery fee</span>
              <span>${DELIVERY_FEE.toFixed(2)}</span>
            </div>
            {tipAmount > 0 && (
              <div className="checkout-subtotal-row">
                <span>Tip</span>
                <span>${tipAmount.toFixed(2)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="checkout-subtotal-row checkout-subtotal-row--discount">
                <span>Promo ({promoApplied})</span>
                <span>−${discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="checkout-tip">
            <p className="checkout-tip-label">Add a tip?</p>
            <div className="checkout-tip-options">
              {TIP_OPTIONS.map((pct) => (
                <button
                  key={pct}
                  type="button"
                  className={`checkout-tip-btn${tipPct === pct ? " checkout-tip-btn--active" : ""}`}
                  onClick={() => { setTipPct(pct); setCustomTip(""); }}
                >
                  {pct === 0 ? "None" : `${pct}%`}
                </button>
              ))}
              <button
                type="button"
                className={`checkout-tip-btn${tipPct === "custom" ? " checkout-tip-btn--active" : ""}`}
                onClick={() => setTipPct("custom")}
              >
                Custom
              </button>
            </div>
            {tipPct === "custom" && (
              <input
                className="checkout-tip-custom"
                type="number"
                min="0"
                step="0.01"
                placeholder="$0.00"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
              />
            )}
          </div>

          <div className="checkout-promo">
            <input
              className="checkout-promo-input"
              type="text"
              placeholder="Promo code (try LEMON10)"
              value={promoInput}
              onChange={(e) => { setPromoInput(e.target.value); setPromoError(""); }}
            />
            <button type="button" className="checkout-promo-btn" onClick={handlePromo}>Apply</button>
          </div>
          {promoError && <p className="checkout-promo-error">{promoError}</p>}
          {promoApplied && <p className="checkout-promo-success">{Math.round(PROMO_CODES[promoApplied]*100)}% off applied!</p>}

          <div className="checkout-total">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Your Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" value={form.name}
                onChange={handleChange} placeholder="Jane Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="jane@example.com" required />
            </div>
          </div>

          <h3>Delivery Address</h3>
          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input id="street" name="street" type="text" value={form.street}
              onChange={handleChange} placeholder="123 Main Street" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" value={form.city}
                onChange={handleChange} placeholder="Chicago" required />
            </div>
            <div className="form-group form-group--sm">
              <label htmlFor="state">State</label>
              <input id="state" name="state" type="text" value={form.state}
                onChange={handleChange} placeholder="IL" maxLength={2} required />
            </div>
            <div className="form-group form-group--sm">
              <label htmlFor="zip">ZIP</label>
              <input id="zip" name="zip" type="text" value={form.zip}
                onChange={handleChange} placeholder="60601" maxLength={5} required />
            </div>
          </div>

          <div className="checkout-notice">
            <p>🔒 Demo checkout — no payment is processed.</p>
          </div>
          <button type="submit" className="checkout-btn checkout-btn--full">
            Place Order · ${grandTotal.toFixed(2)}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
