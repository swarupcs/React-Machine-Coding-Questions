import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";

const CommentsContext = createContext(null);

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState({});

  // ✅ Add new comment or reply
  const addComment = useCallback(({ text, parentId }) => {
    const id = Date.now();

    setComments((prev) => ({
      ...prev,
      [id]: {
        id,
        text,
        liked: 0,
        disliked: 0,
        parentId,
        createdAt: Date.now(),
      },
    }));
  }, []);

  // ✅ Like toggle
  const likeComment = useCallback(({ id }) => {
    setComments((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        liked: prev[id].liked ? 0 : 1,
      },
    }));
  }, []);

  // ✅ Dislike toggle
  const dislikeComment = useCallback(({ id }) => {
    setComments((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        disliked: prev[id].disliked ? 0 : 1,
      },
    }));
  }, []);

  // ✅ Delete comment + all children recursively
  const deleteComment = useCallback((commentId) => {
    setComments((prev) => {
      const updated = { ...prev };

      function deleteRecursive(id) {
        Object.values(updated)
          .filter((c) => c.parentId === id)
          .forEach((child) => deleteRecursive(child.id));

        delete updated[id];
      }

      deleteRecursive(commentId);
      return updated;
    });
  }, []);

  const value = useMemo(() => {
    return {
      comments,
      addComment,
      likeComment,
      dislikeComment,
      deleteComment,
    };
  }, [comments, addComment, likeComment, dislikeComment, deleteComment]);

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const ctx = useContext(CommentsContext);
  if (!ctx) throw new Error("useComments must be inside CommentsProvider");
  return ctx;
};
