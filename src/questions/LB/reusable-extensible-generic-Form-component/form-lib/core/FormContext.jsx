import { createContext, useContext, useState, useRef } from "react";
import { validateField } from "./validation";

const FormContext = createContext(null);

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("Form fields must be used inside <Form>");
  return ctx;
}

/**
 * Main Form Wrapper
 */
export default function Form({
  children,
  onSubmit,
  validate, // cross-field validation
  mode = "onSubmit", // onSubmit | onChange | onBlur
}) {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [dirty, setDirty] = useState({});
  const timeouts = useRef({});

  // Register field when mounted
  function registerField(name, config) {
    setFields((prev) => ({
      ...prev,
      [name]: {
        ...config,
        value:
          config.value !== undefined
            ? config.value
            : config.defaultValue ?? "",
      },
    }));
  }

  // Unregister field when unmounted
  function unregisterField(name) {
    setFields((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }

  // Update value
  function setFieldValue(name, value) {
    setFields((prev) => ({
      ...prev,
      [name]: { ...prev[name], value },
    }));

    setDirty((prev) => ({ ...prev, [name]: true }));
  }

  // Mark touched
  function setFieldTouched(name) {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  // Validate one field
  async function validateSingleField(name) {
    const field = fields[name];
    if (!field) return null;

    const error = await validateField(field.value, field.validation);
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  }

  // Async validation debounce
  function validateAsync(name, delay = 400) {
    clearTimeout(timeouts.current[name]);

    timeouts.current[name] = setTimeout(() => {
      validateSingleField(name);
    }, delay);
  }

  // Validate full form
  async function validateAll() {
    let newErrors = {};

    for (const name of Object.keys(fields)) {
      const err = await validateSingleField(name);
      if (err) newErrors[name] = err;
    }

    // Cross-field validation
    if (validate) {
      const crossErrors = await validate(getValues());
      if (crossErrors) {
        newErrors = { ...newErrors, ...crossErrors };
      }
    }

    return Object.keys(newErrors).length === 0;
  }

  // Get all values
  function getValues() {
    let values = {};
    for (const key in fields) {
      values[key] = fields[key].value;
    }
    return values;
  }

  // Reset single field
  function resetField(name) {
    setFieldValue(name, fields[name]?.defaultValue ?? "");
    setErrors((prev) => ({ ...prev, [name]: null }));
    setTouched((prev) => ({ ...prev, [name]: false }));
    setDirty((prev) => ({ ...prev, [name]: false }));
  }

  // Reset entire form
  function resetForm() {
    Object.keys(fields).forEach(resetField);
  }

  // Submit handler
  async function handleSubmit(e) {
    e.preventDefault();

    // Touch all fields
    Object.keys(fields).forEach(setFieldTouched);

    const valid = await validateAll();

    if (!valid) return;

    await onSubmit(getValues(), { resetForm });
  }

  return (
    <FormContext.Provider
      value={{
        fields,
        errors,
        touched,
        dirty,
        mode,
        registerField,
        unregisterField,
        setFieldValue,
        setFieldTouched,
        validateSingleField,
        validateAsync,
        resetField,
      }}
    >
      <form onSubmit={handleSubmit} onReset={resetForm} className="space-y-4">
        {children}
      </form>
    </FormContext.Provider>
  );
}
