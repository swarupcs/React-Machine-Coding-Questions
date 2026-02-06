import { useState } from 'react';
import { useFileExplorer } from '../../context/FileExplorerContext';
import { getChildren } from '../../utils/treeUtils';

const ExplorerItem = ({ item, allItems, level = 0 }) => {
  const { openCreateModal } = useFileExplorer();
  const [open, setOpen] = useState(false);

  const children = getChildren(item.id, allItems);
  const isFolder = item.type === 'folder';

  return (
    <>
      <div className='explorer-item' style={{ paddingLeft: level * 16 }}>
        <span onClick={() => isFolder && setOpen(!open)}>
          {isFolder ? (open ? '📂' : '📁') : '📄'} {item.name}
        </span>

        {isFolder && (
          <button onClick={() => openCreateModal(item.id)}>+</button>
        )}
      </div>

      {open &&
        children.map((child) => (
          <ExplorerItem
            key={child.id}
            item={child}
            allItems={allItems}
            level={level + 1}
          />
        ))}
    </>
  );
};

export default ExplorerItem;
