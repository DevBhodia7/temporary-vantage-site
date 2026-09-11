/**
 * Aurora — React Bits inspired animated aurora background
 * Ported from reactbits.dev/backgrounds/aurora pattern
 * Usage: <Aurora colorStops={["#00D4FF","#0066CC","#001A33"]} amplitude={80} blend={0.6} />
 */
import { useEffect, useRef } from "react";

const Aurora = ({
  colorStops = ["#00D4FF", "#0044AA", "#000D1A"],
  amplitude = 70,
  blend = 0.5,
  speed = 0.5,
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Number of wave layers
    const LAYERS = 4;

    const draw = () => {
      timeRef.current += 0.003 * speed;
      const t = timeRef.current;

      ctx.clearRect(0, 0, W(), H());

      // Dark base
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W(), H());

      for (let l = 0; l < LAYERS; l++) {
        const phase = (l / LAYERS) * Math.PI * 2;
        const colorIdx = l % colorStops.length;
        const colorIdxNext = (l + 1) % colorStops.length;

        const grad = ctx.createLinearGradient(0, 0, W(), H());
        grad.addColorStop(0, colorStops[colorIdx] + "00");
        grad.addColorStop(0.5, colorStops[colorIdx] + Math.floor(blend * 255 * 0.4).toString(16).padStart(2, "0"));
        grad.addColorStop(1, colorStops[colorIdxNext] + "00");

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = 0.55 + 0.25 * Math.sin(t + phase);

        ctx.beginPath();
        ctx.moveTo(0, H() * 0.5);

        for (let x = 0; x <= W(); x += 4) {
          const y =
            H() * 0.5 +
            Math.sin((x / W()) * Math.PI * (2 + l) + t + phase) * (amplitude * (0.6 + 0.4 * Math.sin(t * 0.7 + l))) +
            Math.sin((x / W()) * Math.PI * (1 + l * 0.5) + t * 1.3 + phase) * (amplitude * 0.4);

          ctx.lineTo(x, y);
        }

        ctx.lineTo(W(), H());
        ctx.lineTo(0, H());
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [colorStops, amplitude, blend, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.65 }}
    />
  );
};

export default Aurora;
