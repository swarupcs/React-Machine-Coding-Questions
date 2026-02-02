import { useState } from "react";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

const PasswordStep = ({ email, onBack }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!password) {
      alert("Please enter password");
      return;
    }

    // simulate login
    alert(`Logged in as ${email}`);
  };

  return (
    <>
      <TextBoxComponent
        type="password"
        value={password}
        placeholder="Password"
        floatLabelType="Auto"
        input={({ value }) => setPassword(value)}
        cssClass="e-outline"
      />

      <div className="buttonWrapper">
        <ButtonComponent
          cssClass="e-danger"
          onClick={onBack}
          style={{ fontSize: "18px", padding: "10px 20px" }}
        >
          Change Email
        </ButtonComponent>

        <ButtonComponent
          cssClass="e-success"
          onClick={handleSubmit}
          style={{ fontSize: "18px", padding: "10px 20px" }}
        >
          Submit
        </ButtonComponent>
      </div>
    </>
  );
};

export default PasswordStep;
