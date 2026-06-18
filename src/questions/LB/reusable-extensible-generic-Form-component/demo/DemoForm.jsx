import { useState } from "react";
import Form from "../form-lib";

export default function DemoForm() {
  const [firstName, setFirstName] = useState("");

  const handleSubmit = async (values) => {
    alert("Submitted!");
    console.log(values);
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <Form onSubmit={handleSubmit} mode="onChange">
        <Form.Input
          name="firstName"
          label="First Name"
          required
          value={firstName}
          onChange={setFirstName}
        />

        <Form.Select
          name="country"
          label="Country"
          required
          defaultValue="IN"
          options={[
            { value: "IN", label: "India" },
            { value: "US", label: "USA" },
          ]}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </Form>
    </div>
  );
}
