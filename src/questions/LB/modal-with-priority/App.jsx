import ExampleHighPriority from "./examples/ExampleHighPriority";
import ExampleStackSamePriority from "./examples/ExampleStackSamePriority";

export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Uber Priority Modal System</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <ExampleHighPriority />
        <ExampleStackSamePriority />
      </div>
    </div>
  );
}
