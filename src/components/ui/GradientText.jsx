// GradientText — adapted from ReactBits (reactbits.dev/text-animations/gradient-text)
import "./GradientText.css";

const GradientText = ({
  children,
  className = "",
  colors = ["#00D4FF", "#ffffff", "#00D4FF"],
  animationSpeed = 8,
  showBorder = false,
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(120deg, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animationDuration: `${animationSpeed}s`,
  };
  return (
    <span
      className={`gradient-text ${showBorder ? "with-border" : ""} ${className}`}
      style={gradientStyle}
    >
      {children}
    </span>
  );
};

export default GradientText;
