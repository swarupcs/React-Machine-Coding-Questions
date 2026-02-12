import { useState } from "react";
import { sizeStyles } from "./ratingStyles";

/**
 * Rating Component (Reusable)
 *
 * Props:
 * - maxRating (default 5)
 * - defaultValue
 * - onChange callback
 * - size: small | medium | large
 * - readOnly mode
 */

export default function Rating({
  maxRating = 5,
  defaultValue = 0,
  onChange,
  size = "medium",
  readOnly = false,
}) {
  const [rating, setRating] = useState(defaultValue);
  const [hoverRating, setHoverRating] = useState(0);

  /**
   * Handle click selection
   */
  const handleClick = (value) => {
    if (readOnly) return;

    setRating(value);
    onChange?.(value);
  };

  /**
   * Handle hover highlight
   */
  const handleMouseEnter = (value) => {
    if (readOnly) return;
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  /**
   * Style Helpers
   */
  const containerStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: sizeStyles[size].gap,
    cursor: readOnly ? "default" : "pointer",
  };

  const starStyle = (index) => ({
    fontSize: sizeStyles[size].fontSize,
    color: (hoverRating || rating) >= index ? "#ffc107" : "#e4e5e9",
    transition: "color 0.2s ease",
  });

  return (
    <div style={containerStyle}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={starValue}
            style={starStyle(starValue)}
            role={readOnly ? "img" : "button"}
            aria-label={`${starValue} star`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
