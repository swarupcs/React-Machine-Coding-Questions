export default function FieldWrapper({
  name,
  label,
  required,
  error,
  touched,
  children,
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block font-medium text-sm">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {children}

      {error && touched && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
