// Particles — adapted from ReactBits (reactbits.dev/backgrounds/particles)
// Self-contained canvas implementation — no extra deps needed
import { useEffect, useRef } from "react";

const Particles = ({
  className = "",
  quantity = 60,
  color = "#00D4FF",
  size = 1.2,
  speed = 0.4,
  opacity = 0.3,
  stationary = false,
}) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };
    const { r, g, b } = hexToRgb(color);

    const particles = Array.from({ length: quantity }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: stationary ? 0 : (Math.random() - 0.5) * speed,
      vy: stationary ? 0 : (Math.random() - 0.5) * speed,
      r: size * (0.5 + Math.random() * 0.8),
      alpha: opacity * (0.4 + Math.random() * 0.6),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.fill();
        if (!stationary) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -5) p.x = w + 5;
          if (p.x > w + 5) p.x = -5;
          if (p.y < -5) p.y = h + 5;
          if (p.y > h + 5) p.y = -5;
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [quantity, color, size, speed, opacity, stationary]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default Particles;
