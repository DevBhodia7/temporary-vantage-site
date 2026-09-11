// BlurText — adapted from ReactBits (reactbits.dev/text-animations/blur-text)
// Uses framer-motion (already installed) instead of motion/react
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const buildAnimations = (direction) => {
  const axis = direction === "top" ? { y: -20 } : direction === "bottom" ? { y: 20 } : direction === "left" ? { x: -20 } : { x: 20 };
  return {
    hidden: { filter: "blur(10px)", opacity: 0, ...axis },
    visible: { filter: "blur(0px)", opacity: 1, x: 0, y: 0 },
  };
};

const BlurText = ({
  text = "",
  delay = 50,
  className = "",
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
  ...rest
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const animations = buildAnimations(direction);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.p
      ref={ref}
      className={`flex flex-wrap ${className}`}
      initial="hidden"
      animate={controls}
      {...rest}
    >
      {elements.map((el, i) => (
        <motion.span
          key={i}
          variants={animations}
          transition={{ duration: 0.5, delay: i * (delay / 1000), ease: [0.16, 1, 0.3, 1] }}
          className={animateBy === "words" ? "mr-[0.25em]" : ""}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
        >
          {el === " " ? "\u00A0" : el}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default BlurText;
