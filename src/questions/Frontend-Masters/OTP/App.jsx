import './App.css';
import OTP from './OTP';


function App() {
  function handleOtpComplete(data) {
    console.log({ data });
  }

  return <OTP count={4} onOTPComplete={handleOtpComplete} />;
}

export default App;
