import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

const EmailStep = ({ email, setEmail, onNext }) => {
  const verifyEmail = async () => {
    // simulate API validation
    if (!email.trim()) {
      alert("Please enter a valid email");
      return;
    }

    onNext();
  };

  return (
    <>
      <TextBoxComponent
        type="email"
        value={email}
        placeholder="Email"
        floatLabelType="Auto"
        input={({ value }) => setEmail(value)}
        cssClass="e-outline"
      />

      <div className="buttonWrapper">
        <ButtonComponent
          cssClass="e-info"
          onClick={verifyEmail}
          style={{ fontSize: "18px", padding: "10px 20px" }}
        >
          Next
        </ButtonComponent>
      </div>
    </>
  );
};

export default EmailStep;
