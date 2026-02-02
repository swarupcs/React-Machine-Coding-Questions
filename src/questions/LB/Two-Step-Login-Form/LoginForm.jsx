import { useState } from "react";
import EmailStep from "./EmailStep";
import PasswordStep from "./PasswordStep";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "./App.css";

const LoginForm = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");

  return (
    <div className="box">
      <div className="header">
        <h2>Sign in</h2>
        <p>to continue to Gmail</p>
      </div>

      {step === 0 ? (
        <EmailStep
          email={email}
          setEmail={setEmail}
          onNext={() => setStep(1)}
        />
      ) : (
        <PasswordStep
          email={email}
          onBack={() => setStep(0)}
        />
      )}
    </div>
  );
};

export default LoginForm;
