import { lazy, Suspense } from "react";

import Tabs from "./components/Tabs/Tabs";
import Tab from "./components/Tabs/Tab";
import TabPanel from "./components/Tabs/TabPanel";
import { useTabStore } from "./components/Tabs/useTabStore";

/*
  Lazy load PublishHandler only when tab opens
*/
const PublishHandler = lazy(() =>
  new Promise((resolve) =>
    setTimeout(() => resolve(import("./pages/PublishHandler")), 2000)
  )
);

export default function App() {
  const store = useTabStore("share");

  return (
    <div className="app">
      <h1>Atlassian Tabs with Lazy Loading</h1>

      <Tabs>
        {/* Tab Buttons */}
        <div className="tab-header">
          <Tab id="share" label="Share" store={store} defaultActive />
          <Tab id="publish" label="Publish" store={store} />
        </div>

        {/* Tab Panels */}
        <div className="tab-body">
          <TabPanel tabId="share" store={store}>
            <h2>Share Panel</h2>
            <p>This content loads instantly.</p>
          </TabPanel>

          <TabPanel tabId="publish" store={store} unMountOnHide>
            <Suspense fallback={<p>⏳ Loading Publish Module...</p>}>
              <PublishHandler />
            </Suspense>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}
