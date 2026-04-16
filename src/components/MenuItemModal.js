import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import "./MenuItemModal.css";

function getImage(item, fallback) {
  return item.image_url || fallback;
}

function MenuItemModal({ item, fallbackImage, onClose }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { isLoggedIn } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleAdd = () => {
    if (!isLoggedIn) {
      onClose();
      navigate("/login");
      return;
    }
    addItem(item);
    addToast(`${item.title} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <img
          className="modal-img"
          src={getImage(item, fallbackImage)}
          alt={item.title}
        />
        <div className="modal-body">
          {item.category && <p className="modal-category">{item.category}</p>}
          <div className="modal-title-row">
            <h2 className="modal-title">{item.title}</h2>
            <span className="modal-price">${item.price}</span>
          </div>
          {item.description && <p className="modal-desc">{item.description}</p>}
          <div className="modal-actions">
            <button
              className={`modal-add-btn${added ? " modal-add-btn--added" : ""}`}
              onClick={handleAdd}
              disabled={added}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemModal;
