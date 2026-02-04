export const initialFileSystem = {
  items: {
    root: {
      id: "root",
      name: "Root",
      type: "folder",
      parentId: null,
    },
    folder1: {
      id: "folder1",
      name: "Documents",
      type: "folder",
      parentId: "root",
    },
    folder2: {
      id: "folder2",
      name: "Images",
      type: "folder",
      parentId: "root",
    },
    file1: {
      id: "file1",
      name: "Resume.pdf",
      type: "file",
      parentId: "folder1",
    },
    file2: {
      id: "file2",
      name: "CoverLetter.pdf",
      type: "file",
      parentId: "folder1",
    },
    folder3: {
      id: "folder3",
      name: "Projects",
      type: "folder",
      parentId: "folder1",
    },
    file3: {
      id: "file3",
      name: "photo.png",
      type: "file",
      parentId: "folder2",
    },
  },
  activeItem: null, // null === root
};
