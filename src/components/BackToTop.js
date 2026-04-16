import { useState, useEffect } from "react";
import "./BackToTop.css";

const RADIUS = 16;
const CIRC = 2 * Math.PI * RADIUS;

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(pct);
      setVisible(scrollTop > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  const dashOffset = CIRC * (1 - progress);

  return (
    <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="btt-ring">
        <circle cx="22" cy="22" r={RADIUS} stroke="var(--green-light)" strokeWidth="2.5" fill="none" />
        <circle
          cx="22" cy="22" r={RADIUS}
          stroke="var(--green)"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={CIRC}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>
      <span className="btt-arrow">↑</span>
    </button>
  );
}

export default BackToTop;
