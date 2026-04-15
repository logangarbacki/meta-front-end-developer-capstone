import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./PageTransition.css";

function PageTransition({ children }) {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("page-fade-in");
    void el.offsetHeight; // force reflow
    el.classList.add("page-fade-in");
  }, [location.pathname]);

  return (
    <div ref={ref} className="page-fade-in">
      {children}
    </div>
  );
}

export default PageTransition;
