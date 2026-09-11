// ShinyText — adapted from ReactBits (reactbits.dev/text-animations/shiny-text)
import "./ShinyText.css";

const ShinyText = ({ text, disabled = false, speed = 5, className = "" }) => {
  const animStyle = { animationDuration: `${speed}s` };
  return (
    <span className={`shiny-text ${disabled ? "disabled" : ""} ${className}`} style={animStyle}>
      {text}
    </span>
  );
};

export default ShinyText;
