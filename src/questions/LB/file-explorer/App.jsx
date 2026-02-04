import { useMemo, useState } from "react";
import { initialFileSystem } from "./data/fileSystem";
import { getChildren, getBreadcrumbPath } from "./utils/helpers";
import Breadcrumb from "./components/Breadcrumb";
import ExplorerGrid from "./components/ExplorerGrid";
import "./styles.css";

export default function App() {
  const [state, setState] = useState(initialFileSystem);

  const children = useMemo(
    () => getChildren(state.items, state.activeItem),
    [state]
  );

  const breadcrumbPath = useMemo(
    () => getBreadcrumbPath(state.items, state.activeItem),
    [state]
  );

  const setActiveItem = (id) => {
    setState((prev) => ({ ...prev, activeItem: id }));
  };

  return (
    <div className="App">
      <Breadcrumb path={breadcrumbPath} onNavigate={setActiveItem} />
      <ExplorerGrid items={children} onOpen={setActiveItem} />
    </div>
  );
}
