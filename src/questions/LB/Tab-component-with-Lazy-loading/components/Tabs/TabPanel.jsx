/*
  TabPanel shows children only when active.
*/

export default function TabPanel({
  tabId,
  store,
  unMountOnHide = false,
  children,
}) {
  const { activeTab } = store;

  // If unMountOnHide is true → completely remove from DOM
  if (unMountOnHide && activeTab !== tabId) {
    return null;
  }

  // Otherwise, just hide visually
  const hidden = activeTab !== tabId;

  return (
    <div
      role="tabpanel"
      hidden={hidden}
      className={`tab-panel-content ${hidden ? "hide" : ""}`}
    >
      {children}
    </div>
  );
}
