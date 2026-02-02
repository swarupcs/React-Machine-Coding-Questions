import { FeatureFlagProvider } from "./FeatureFlagContext";
import Example from "./Example";

export default function App() {
  return (
    <FeatureFlagProvider>
      <Example />
    </FeatureFlagProvider>
  );
}
