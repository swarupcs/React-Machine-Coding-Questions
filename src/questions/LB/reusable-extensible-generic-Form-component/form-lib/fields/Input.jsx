import FieldWrapper from "../core/FieldWrapper";
import { useFormField } from "../core/useFormField";

export default function Input(props) {
  const field = useFormField(props);

  return (
    <FieldWrapper {...props} error={field.error} touched={field.touched}>
      <input
        className="w-full border px-3 py-2 rounded-md"
        value={field.value}
        placeholder={props.placeholder}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
    </FieldWrapper>
  );
}
