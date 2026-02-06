import { useState } from "react";

/*
  Custom store hook for Tabs.
  Keeps activeTab in one place.
*/

export function useTabStore(defaultTabId = null) {
  const [activeTab, setActiveTab] = useState(defaultTabId);

  return {
    activeTab,
    setActiveTab,
  };
}
