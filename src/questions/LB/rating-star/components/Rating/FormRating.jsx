import { useState } from "react";
import { sizeStyles } from "./ratingStyles";

/**
 * FormRating Component
 *
 * Key Feature:
 * - Works inside normal <form>
 * - Submits correct value via hidden input
 *
 * Props:
 * - name (required)
 * - label
 * - required
 * - defaultValue
 * - maxRating
 */

export default function FormRating({
  name,
  label,
  required = false,
  maxRating = 5,
  defaultValue = 0,
  size = "medium",
  error,
  onChange,
}) {
  const [rating, setRating] = useState(defaultValue);
  const [hoverRating, setHoverRating] = useState(0);

  /**
   * Select star rating
   */
  const handleClick = (value) => {
    setRating(value);
    onChange?.(value);
  };

  /**
   * Keyboard support
   */
  const handleKeyDown = (e, value) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(value);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {/* Label */}
      {label && (
        <label style={{ fontWeight: "600" }}>
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </label>
      )}

      {/* Stars */}
      <div
        style={{
          display: "inline-flex",
          gap: sizeStyles[size].gap,
          cursor: "pointer",
        }}
      >
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;

          return (
            <span
              key={starValue}
              role="button"
              tabIndex={0}
              aria-label={`${starValue} stars`}
              onClick={() => handleClick(starValue)}
              onKeyDown={(e) => handleKeyDown(e, starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              style={{
                fontSize: sizeStyles[size].fontSize,
                color:
                  (hoverRating || rating) >= starValue
                    ? "#ffc107"
                    : "#ddd",
              }}
            >
              ★
            </span>
          );
        })}

        {/* Show numeric value */}
        {rating > 0 && (
          <span style={{ marginLeft: "10px", color: "#555" }}>
            {rating}/{maxRating}
          </span>
        )}
      </div>

      {/* ✅ Hidden Input for Form Submission */}
      <input type="hidden" name={name} value={rating} />

      {/* Error Message */}
      {error && (
        <p style={{ color: "red", fontSize: "13px" }}>{error}</p>
      )}
    </div>
  );
}
