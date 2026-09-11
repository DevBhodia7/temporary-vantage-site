// CountUp — adapted from ReactBits (reactbits.dev/text-animations/count-up)
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, animate } from "framer-motion";

const CountUp = ({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(direction === "down" ? to : from);

  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView && startWhen) {
      const timeout = setTimeout(() => {
        if (onStart) onStart();
        motionVal.set(direction === "down" ? from : to);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [inView, startWhen, motionVal, direction, to, from, delay, onStart]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        const num = direction === "down" ? Math.ceil(latest) : Math.floor(latest);
        const formatted = separator
          ? num.toLocaleString().replace(/,/g, separator)
          : String(num);
        ref.current.textContent = formatted;
      }
    });
    const unsubscribeEnd = spring.on("animationComplete", () => {
      if (onEnd) onEnd();
    });
    return () => { unsubscribe(); unsubscribeEnd(); };
  }, [spring, separator, direction, onEnd]);

  return <span ref={ref} className={className}>{direction === "down" ? to : from}</span>;
};

export default CountUp;
