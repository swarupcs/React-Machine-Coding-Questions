import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const FeatureFlagContext = createContext(null);

// Fake API call (replace with real API)
const fetchFeatureFlags = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        darkMode: true,
        chatEnabled: false,
        betaDashboard: true,
      });
    }, 800);
  });

export const FeatureFlagProvider = ({ children }) => {
  const [features, setFeatures] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem("featureFlags");

    if (cached) {
      setFeatures(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetchFeatureFlags().then((flags) => {
      setFeatures(flags);
      localStorage.setItem("featureFlags", JSON.stringify(flags));
      setLoading(false);
    });
  }, []);

  return (
    <FeatureFlagContext.Provider value={{ features, loading }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

// Custom hook (recommended)
export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);

  if (!context) {
    throw new Error("useFeatureFlags must be used inside FeatureFlagProvider");
  }

  return context;
};
