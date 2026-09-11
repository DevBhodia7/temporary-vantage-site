/**
 * StaggeredGrid — Vengeance UI "staggered-grid" pattern
 * Offset card grid where odd items shift down for visual rhythm.
 * Children are distributed into columns with alternating vertical offset.
 */
import { motion } from "framer-motion";

const StaggeredGrid = ({ children, className = "", cols = 4, offsetY = 48 }) => {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div
      className={`grid gap-5 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 + (i % 2 === 1 ? offsetY : 0) }}
          whileInView={{ opacity: 1, y: i % 2 === 1 ? offsetY : 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.65,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export default StaggeredGrid;
