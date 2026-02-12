import { useState } from "react";
import { FormRating } from "../components/Rating";

/**
 * Airbnb expects:
 * - Multiple rating widgets in same form
 * - Correct value submitted
 */

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    product: 0,
    service: 0,
    delivery: 0,
  });

  const [errors, setErrors] = useState({});

  /**
   * Submit Handler
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    let newErrors = {};
    if (formData.product === 0)
      newErrors.product = "Please rate product quality";
    if (formData.service === 0)
      newErrors.service = "Please rate customer service";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Form Submitted Successfully!");

    console.log("Submitted Ratings:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "400px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>Leave a Review ⭐</h2>

      {/* Product Rating */}
      <FormRating
        name="product"
        label="Product Quality"
        required
        error={errors.product}
        onChange={(val) => {
          setFormData({ ...formData, product: val });
          setErrors({ ...errors, product: "" });
        }}
      />

      <br />

      {/* Service Rating */}
      <FormRating
        name="service"
        label="Customer Service"
        required
        error={errors.service}
        onChange={(val) => {
          setFormData({ ...formData, service: val });
          setErrors({ ...errors, service: "" });
        }}
      />

      <br />

      {/* Delivery Rating */}
      <FormRating
        name="delivery"
        label="Delivery Speed"
        onChange={(val) =>
          setFormData({ ...formData, delivery: val })
        }
      />

      <button
        type="submit"
        style={{
          marginTop: "20px",
          padding: "10px",
          width: "100%",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Submit Review
      </button>
    </form>
  );
}
