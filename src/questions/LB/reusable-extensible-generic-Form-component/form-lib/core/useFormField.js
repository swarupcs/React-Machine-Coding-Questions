import { useEffect } from "react";
import { useFormContext } from "./FormContext";

/**
 * Shared hook for all fields
 * Handles controlled/uncontrolled seamlessly
 */
export function useFormField({
  name,
  required,
  validation,
  value,
  defaultValue,
}) {
  const {
    fields,
    errors,
    touched,
    mode,
    registerField,
    unregisterField,
    setFieldValue,
    setFieldTouched,
    validateSingleField,
    validateAsync,
  } = useFormContext();

  const isControlled = value !== undefined;

  // Register field
  useEffect(() => {
    registerField(name, {
      defaultValue,
      validation: required
        ? [{ required: true }, ...(validation || [])]
        : validation,
    });

    return () => unregisterField(name);
  }, [name]);

  // Controlled sync
  useEffect(() => {
    if (isControlled) {
      setFieldValue(name, value);
    }
  }, [value]);

  const fieldValue = isControlled
    ? value
    : fields[name]?.value ?? "";

  function handleChange(val) {
    if (!isControlled) {
      setFieldValue(name, val);
    }

    if (mode === "onChange") {
      validateAsync(name);
    }
  }

  function handleBlur() {
    setFieldTouched(name);

    if (mode === "onBlur") {
      validateSingleField(name);
    }
  }

  return {
    value: fieldValue,
    error: errors[name],
    touched: touched[name],
    handleChange,
    handleBlur,
  };
}
