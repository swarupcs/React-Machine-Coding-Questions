/**
 * Runs all validation rules for a field
 * Supports sync + async validators
 */
export async function validateField(value, rules = []) {
  for (const rule of rules) {
    // Required
    if (rule.required) {
      if (value === "" || value === null || value === undefined) {
        return rule.message || "This field is required";
      }
    }

    // Min Length
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message || `Minimum ${rule.minLength} characters required`;
    }

    // Max Length
    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message || `Maximum ${rule.maxLength} characters allowed`;
    }

    // Regex Pattern
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || "Invalid format";
    }

    // Custom validator (sync or async)
    if (rule.validator) {
      const result = await rule.validator(value);

      if (result !== true) {
        return typeof result === "string"
          ? result
          : rule.message || "Validation failed";
      }
    }
  }

  return null;
}
