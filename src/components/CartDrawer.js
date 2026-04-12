import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartDrawer.css";

const CartDrawer = ({ open, onClose }) => {
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {open && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-drawer ${open ? "cart-drawer--open" : ""}`}>
        <div className="cart-drawer-header">
          <h3>Your Order ({totalItems})</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
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
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    <button className="cart-item-remove" onClick={() => removeItem(item.id)}>✕</button>
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
