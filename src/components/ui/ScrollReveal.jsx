// ScrollReveal — adapted from ReactBits (reactbits.dev/animations/scroll-reveal)
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 30,
  once = true,
  threshold = "-60px",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: threshold });

  const axis = direction === "up" ? { y: distance } :
               direction === "down" ? { y: -distance } :
               direction === "left" ? { x: distance } : { x: -distance };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...axis }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...axis }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
