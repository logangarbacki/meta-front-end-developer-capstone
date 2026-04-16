import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./NavProgress.css";

function NavProgress() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setVisible(true);
    setProgress(0);

    const steps = [
      { p: 30, delay: 0 },
      { p: 60, delay: 80 },
      { p: 85, delay: 180 },
      { p: 100, delay: 320 },
    ];

    steps.forEach(({ p, delay }) => {
      timerRef.current = setTimeout(() => setProgress(p), delay);
    });

    const hide = setTimeout(() => setVisible(false), 520);

    return () => {
      clearTimeout(hide);
    };
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div className="nav-progress">
      <div className="nav-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default NavProgress;
