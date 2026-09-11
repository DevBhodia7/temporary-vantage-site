/**
 * AnimatedRays — Vengeance UI "animated-rays" component
 * Ported from: https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/animated-rays.json
 * Pure CSS conic gradient rays that rotate around a center point.
 */
import { useEffect, useRef } from "react";

const AnimatedRays = ({
  className = "",
  numRays = 12,
  color = "rgba(0,212,255,0.12)",
  duration = 18,
  children,
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Rotating conic rays */}
      <div
        className="absolute inset-0 origin-center"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${Array.from({ length: numRays * 2 })
            .map((_, i) =>
              i % 2 === 0
                ? `${color} ${(i / (numRays * 2)) * 360}deg`
                : `transparent ${(i / (numRays * 2)) * 360}deg`
            )
            .join(", ")})`,
          animation: `rays-rotate ${duration}s linear infinite`,
          opacity: 0.7,
        }}
      />

      {/* Secondary slower counter-rotation */}
      <div
        className="absolute inset-0 origin-center"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, ${Array.from({ length: numRays })
            .map((_, i) =>
              i % 2 === 0
                ? `rgba(0,100,180,0.08) ${(i / numRays) * 360}deg`
                : `transparent ${(i / numRays) * 360}deg`
            )
            .join(", ")})`,
          animation: `rays-rotate ${duration * 1.7}s linear infinite reverse`,
          opacity: 0.5,
        }}
      />

      {/* Radial overlay to fade edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {children}
    </div>
  );
};

export default AnimatedRays;
