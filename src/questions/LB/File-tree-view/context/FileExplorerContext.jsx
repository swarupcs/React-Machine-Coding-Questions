import { createContext, useContext, useState } from 'react';
import Modal from '../components/Modal/Modal';
import CreateItemForm from '../components/CreateItemForm';

const FileExplorerContext = createContext(null);

export const useFileExplorer = () => useContext(FileExplorerContext);

export const FileExplorerProvider = ({ children }) => {
  const [items, setItems] = useState({});
  const [modalParentId, setModalParentId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const createItem = ({ name, type }) => {
    const id = `${type}_${Date.now()}`;

    setItems((prev) => ({
      ...prev,
      [id]: {
        id,
        name,
        type,
        parentId: modalParentId,
      },
    }));

    setShowModal(false);
    setModalParentId(null);
  };

  const openCreateModal = (parentId) => {
    setModalParentId(parentId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalParentId(null);
  };

  return (
    <FileExplorerContext.Provider
      value={{ items, createItem, openCreateModal }}
    >
      {children}

      <Modal show={showModal} onClose={closeModal} title='Create Item'>
        <CreateItemForm onSubmit={createItem} />
      </Modal>
    </FileExplorerContext.Provider>
  );
};
