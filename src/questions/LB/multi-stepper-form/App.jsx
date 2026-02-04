import Stepper from "./components/Stepper";
import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import Form3 from "./components/Form3";

export default function App() {
  return <Stepper list={[<Form1 />, <Form2 />, <Form3 />]} />;
}
