import { useState, useEffect } from "react";
import "./Gallery.css";

const PHOTOS = [
  { id: 1, url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", alt: "Mediterranean spread", category: "Food" },
  { id: 2, url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80", alt: "Restaurant interior", category: "Ambiance" },
  { id: 3, url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", alt: "Pizza", category: "Food" },
  { id: 4, url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Fine dining", category: "Ambiance" },
  { id: 5, url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80", alt: "Fresh salad", category: "Food" },
  { id: 6, url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80", alt: "Dessert plating", category: "Food" },
  { id: 7, url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", alt: "Cocktails", category: "Drinks" },
  { id: 8, url: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80", alt: "Breakfast board", category: "Food" },
  { id: 9, url: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80", alt: "Outdoor seating", category: "Ambiance" },
  { id: 10, url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80", alt: "Wine selection", category: "Drinks" },
  { id: 11, url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80", alt: "Pancakes", category: "Food" },
  { id: 12, url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80", alt: "Bar area", category: "Ambiance" },
];

const TABS = ["All", "Food", "Drinks", "Ambiance"];

function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => { document.title = "Gallery | Little Lemon"; }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox]);

  const visible = active === "All" ? PHOTOS : PHOTOS.filter((p) => p.category === active);

  return (
    <main className="gallery-page">
      <div className="gallery-header">
        <p className="gallery-eyebrow">Little Lemon</p>
        <h2>Photo Gallery</h2>
        <p className="gallery-sub">A taste of our atmosphere, dishes, and drinks.</p>
      </div>

      <div className="gallery-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`gallery-tab${active === t ? " gallery-tab--active" : ""}`}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {visible.map((photo) => (
          <button
            key={photo.id}
            className="gallery-item"
            onClick={() => setLightbox(photo)}
            aria-label={`View ${photo.alt}`}
          >
            <img src={photo.url} alt={photo.alt} loading="lazy" />
            <div className="gallery-item-overlay">
              <span>{photo.alt}</span>
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <img
            src={lightbox.url}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
            className="lightbox-img"
          />
          <p className="lightbox-caption" onClick={(e) => e.stopPropagation()}>{lightbox.alt}</p>
        </div>
      )}
    </main>
  );
}

export default Gallery;
