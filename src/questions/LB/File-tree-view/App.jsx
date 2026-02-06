import { FileExplorerProvider } from './context/FileExplorerContext';
import ExplorerTree from './components/Explorer/ExplorerTree';

export default function App() {
  return (
    <FileExplorerProvider>
      <h2>File Explorer</h2>
      <ExplorerTree />
    </FileExplorerProvider>
  );
}
