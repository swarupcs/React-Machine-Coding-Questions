import FormattedTime from "./components/FormattedTime";

const App = () => {
  return (
    <div style={{ padding: "40px", fontSize: "18px" }}>
      <h2>Formatted Time Example</h2>

      <FormattedTime time={new Date("Sun Nov 20 2022 14:20:59")} />
    </div>
  );
};

export default App;
