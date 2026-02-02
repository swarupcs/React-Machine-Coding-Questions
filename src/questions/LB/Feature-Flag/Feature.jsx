import { useFeatureFlags } from "./FeatureFlagContext";

const Feature = ({ name, value = true, children, fallback = null }) => {
  const { features, loading } = useFeatureFlags();

  if (loading) return null;

  return features[name] === value ? children : fallback;
};

export default Feature;
