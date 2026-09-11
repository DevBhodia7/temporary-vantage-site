/**
 * GlowBorderCard — Vengeance UI "glow-border-card" component
 * Ported from: https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/glow-border-card.json
 * Animated rotating gradient border around a card.
 */
import { useRef, useEffect } from "react";

const PRESETS = {
  electric: ["#00D4FF", "#0066CC", "#00FFA3", "#00D4FF"],
  aurora: ["#00D4FF", "#00FFA3", "#7C3AED", "#00D4FF"],
  ember: ["#FF4500", "#FF8C00", "#FFD700", "#FF4500"],
  ocean: ["#006699", "#1177AA", "#2288BB", "#0097CC", "#006699"],
};

const GlowBorderCard = ({
  children,
  className = "",
  gradientColors,
  colorPreset = "electric",
  animationDuration = 4,
  borderWidth = "1.5px",
  blurAmount = "8px",
  borderRadius = "1rem",
  paused = false,
}) => {
  const containerRef = useRef(null);
  const angleRef = useRef(0);
  const rafRef = useRef(null);

  const colors = gradientColors || PRESETS[colorPreset] || PRESETS.electric;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || paused) return;

    const speed = 360 / (animationDuration * 60); // degrees per frame at ~60fps

    const animate = () => {
      angleRef.current = (angleRef.current + speed) % 360;
      const gradient = `conic-gradient(from ${angleRef.current}deg at 50% 50%, ${colors.join(", ")})`;
      container.style.setProperty("--glow-gradient", gradient);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animationDuration, colors, paused]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ borderRadius }}
    >
      {/* Glow halo underneath — soft outer glow */}
      <div
        className="absolute inset-[-1px] pointer-events-none"
        style={{
          borderRadius,
          background: "var(--glow-gradient, conic-gradient(from 0deg, #00D4FF, #0066CC, #00D4FF))",
          filter: `blur(${blurAmount})`,
          opacity: 0.55,
          zIndex: -1,
        }}
      />

      {/* Sharp crisp border layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          padding: borderWidth,
          background: "var(--glow-gradient, conic-gradient(from 0deg, #00D4FF, #0066CC, #00D4FF))",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: 0.9,
        }}
      />

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
};

export default GlowBorderCard;
