import { useState } from "react";
import Form from "./form-lib";

export default function App() {
  const [firstName, setFirstName] = useState("");

  async function handleSubmit(values) {
    alert("Submitted: " + JSON.stringify(values, null, 2));
  }

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Generic Form Library Demo
      </h1>

      <Form onSubmit={handleSubmit} mode="onChange">
        {/* Controlled */}
        <Form.Input
          name="firstName"
          label="First Name (Controlled)"
          value={firstName}
          onChange={setFirstName}
          required
        />

        {/* Uncontrolled */}
        <Form.Input
          name="lastName"
          label="Last Name (Uncontrolled)"
          defaultValue=""
        />

        <Form.Select
          name="country"
          label="Country"
          options={[
            { value: "IN", label: "India" },
            { value: "US", label: "USA" },
          ]}
          required
        />

        <Form.Checkbox
          name="acceptTerms"
          label="Accept Terms"
          required
        />

        <Form.RadioGroup
          name="gender"
          label="Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />

        <Form.TextArea
          name="comments"
          label="Comments"
          placeholder="Write something..."
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Submit
        </button>

        <button
          type="reset"
          className="ml-3 border px-4 py-2 rounded-md"
        >
          Reset
        </button>
      </Form>
    </div>
  );
}
