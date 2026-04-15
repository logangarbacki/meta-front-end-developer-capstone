import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { addToast } = useToast();
  useEffect(() => { document.title = "Checkout | Little Lemon"; }, []);
  const [form, setForm] = useState({ name: "", email: "" });
  const [confirmed, setConfirmed] = useState(false);
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setConfirmed(true);
    addToast(`Order #${orderNumber} placed! Thanks, ${form.name}!`);
  };

  if (items.length === 0 && !confirmed) {
    return (
      <main className="checkout">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <Link to="/menu" className="reserve-btn">Browse Menu</Link>
        </div>
      </main>
    );
  }

  if (confirmed) {
    return (
      <main className="checkout">
        <div className="checkout-confirmed">
          <div className="checkout-confirmed-icon">✓</div>
          <h2>Order Placed!</h2>
          <p>Thank you, <strong>{form.name}</strong>! Your order <strong>#{orderNumber}</strong> has been received.</p>
          <p>A confirmation will be sent to <strong>{form.email}</strong>.</p>
          <Link to="/menu" className="reserve-btn">Back to Menu</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-layout">
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <ul className="checkout-items">
            {items.map((item) => (
              <li key={item.id} className="checkout-item">
                <span>{item.title} × {item.qty}</span>
                <span>${(parseFloat(item.price) * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Your Details</h3>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
            />
          </div>
          <div className="checkout-notice">
            <p>🔒 This is a demo checkout. No payment is processed.</p>
          </div>
          <button type="submit" className="reserve-btn checkout-submit">
            Place Order
          </button>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
