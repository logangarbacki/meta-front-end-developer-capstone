import { useCallback } from "react";

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const COLORS = ["#f4ce14", "#495e57", "#ee9972", "#fbdabb", "#ffffff"];

export function useConfetti() {
  const launch = useCallback(() => {
    const count = 80;
    const container = document.createElement("div");
    container.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;";
    document.body.appendChild(container);

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = randomBetween(6, 12);
      const startX = randomBetween(20, 80);
      const endX = startX + randomBetween(-20, 20);
      const duration = randomBetween(900, 1600);
      const delay = randomBetween(0, 400);
      const rotate = randomBetween(0, 720);
      const shape = Math.random() > 0.5 ? "50%" : "2px";

      el.style.cssText = `
        position:absolute;
        width:${size}px;
        height:${size}px;
        background:${color};
        border-radius:${shape};
        left:${startX}%;
        top:-10px;
        opacity:1;
        animation: confetti-fall ${duration}ms ${delay}ms ease-in forwards;
        --end-x: ${endX - startX}vw;
        --rotate: ${rotate}deg;
      `;
      container.appendChild(el);
    }

    if (!document.getElementById("confetti-keyframes")) {
      const style = document.createElement("style");
      style.id = "confetti-keyframes";
      style.textContent = `
        @keyframes confetti-fall {
          0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) translateX(var(--end-x)) rotate(var(--rotate)); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    setTimeout(() => {
      if (container.parentNode) container.parentNode.removeChild(container);
    }, 2200);
  }, []);

  return launch;
}
