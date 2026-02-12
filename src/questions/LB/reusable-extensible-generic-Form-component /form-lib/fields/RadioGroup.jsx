import { useFormField } from "../core/useFormField";

export default function Checkbox(props) {
  const field = useFormField(props);

  return (
    <label className="flex gap-2 items-center">
      <input
        type="checkbox"
        checked={!!field.value}
        onChange={(e) => field.handleChange(e.target.checked)}
        onBlur={field.handleBlur}
      />
      {props.label}

      {field.error && field.touched && (
        <span className="text-red-600 text-sm ml-2">{field.error}</span>
      )}
    </label>
  );
}
