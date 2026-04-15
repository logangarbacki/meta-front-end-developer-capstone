import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import "./CartDrawer.css";

const CartDrawer = ({ open, onClose }) => {
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  // ESC key closes drawer
  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === "Escape" && open) onClose(); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {open && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-drawer${open ? " cart-drawer--open" : ""}`} role="dialog" aria-label="Your cart" aria-modal="true">
        <div className="cart-drawer-header">
          <h3>Your Order {totalItems > 0 && <span className="cart-header-count">({totalItems})</span>}</h3>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p className="cart-empty-title">Your cart is empty</p>
            <p className="cart-empty-sub">Add items from our menu to get started.</p>
            <Link to="/menu" className="cart-empty-btn" onClick={onClose}>Browse Menu</Link>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.title}</span>
                    <span className="cart-item-price">${(parseFloat(item.price) * item.qty).toFixed(2)}</span>
                  </div>
                  <div className="cart-item-controls">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">+</button>
                    <button className="cart-item-remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.title}`}>✕</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className="cart-checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
