import Feature from "./Feature";
import { useFeatureFlags } from "./FeatureFlagContext";
import Chat from "./Chat";

const Example = () => {
  const { features, loading } = useFeatureFlags();

  if (loading) return <p>Loading features...</p>;

  return (
    <div>
      <h2>Feature Flags Demo</h2>

      <Feature name="darkMode">
        <p>🌙 Dark Mode Enabled</p>
      </Feature>

      <Feature name="darkMode" value={false}>
        <p>☀️ Light Mode</p>
      </Feature>

      <Feature name="chatEnabled">
        <Chat />
      </Feature>

      <Feature name="betaDashboard">
        <p>🚀 Beta Dashboard Access</p>
      </Feature>

      <pre>{JSON.stringify(features, null, 2)}</pre>
    </div>
  );
};

export default Example;
