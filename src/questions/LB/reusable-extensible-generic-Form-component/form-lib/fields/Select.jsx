import FieldWrapper from "../core/FieldWrapper";
import { useFormField } from "../core/useFormField";

export default function Select({ options = [], ...props }) {
  const field = useFormField(props);

  return (
    <FieldWrapper {...props} error={field.error} touched={field.touched}>
      <select
        className="w-full border px-3 py-2 rounded-md"
        value={field.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
