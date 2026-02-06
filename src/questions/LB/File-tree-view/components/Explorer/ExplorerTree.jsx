import { useFileExplorer } from '../../context/FileExplorerContext';
import ExplorerItem from './ExplorerItem';
import { getChildren } from '../../utils/treeUtils';
import './explorer.css';

const ExplorerTree = () => {
  const { items, openCreateModal } = useFileExplorer();
  const roots = getChildren(null, items);

  if (roots.length === 0) {
    return <button onClick={() => openCreateModal(null)}>Create src</button>;
  }

  return (
    <>
      {roots.map((root) => (
        <ExplorerItem key={root.id} item={root} allItems={items} />
      ))}
    </>
  );
};

export default ExplorerTree;
