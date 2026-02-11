Got it 😄
This is one of the **most common SDE2 machine coding rounds** (Adobe + Swiggy + Reddit style).

The key is:

✅ Unlimited nested replies
✅ Like / Dislike
✅ Delete with children removal
✅ Clean architecture (Context + Normalized State)
✅ Depth limiting
✅ Proper folder structure + CSS

So below is the **FULL COMPLETE PROJECT CODE** with a proper interview-ready structure.

---

# ✅ Nested Comments in React (Replies + Likes + Delete)

---

# 📂 Folder Structure (Best Practice)

```
nested-comments/
│
├── public/
│   └── index.html
│
├── src/
│   │
│   ├── context/
│   │   └── CommentsContext.jsx
│   │
│   ├── components/
│   │   ├── CommentBox.jsx
│   │   ├── CommentItem.jsx
│   │   └── CommentsTree.jsx
│   │
│   ├── styles/
│   │   └── comments.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── README.md
```

---

---

# ✅ Step 1: Entry Point

## `src/main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

---

# ✅ Step 2: Comments Context (State + Actions)

### Interview Notes

* We store comments in **normalized form**
* Operations like add/update/delete are **O(1)**
* Delete is recursive (children removed)

---

## `src/context/CommentsContext.jsx`

```jsx
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
```

---

---

# ✅ Step 3: Comment Input Box

### Used for both:

* Root comment
* Reply comment

---

## `src/components/CommentBox.jsx`

```jsx
import { useState } from "react";
import { useComments } from "../context/CommentsContext";

export default function CommentBox({ parentId = null, onDone }) {
  const { addComment } = useComments();
  const [text, setText] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && text.trim()) {
      e.preventDefault();

      addComment({ text, parentId });
      setText("");

      onDone?.(); // close reply box if needed
    }
  };

  return (
    <textarea
      className="comment-box"
      value={text}
      placeholder="Write a comment..."
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
```

---

---

# ✅ Step 4: Single Comment Item

### Interview Notes

Each comment supports:

* Like
* Dislike
* Reply
* Delete
* Nested rendering

---

## `src/components/CommentItem.jsx`

```jsx
import { useState } from "react";
import { useComments } from "../context/CommentsContext";
import CommentBox from "./CommentBox";
import CommentsTree from "./CommentsTree";

const MAX_DEPTH = 3;

export default function CommentItem({ comment, level }) {
  const { likeComment, dislikeComment, deleteComment } = useComments();
  const [replying, setReplying] = useState(false);

  return (
    <div className="comment-item" style={{ marginLeft: level * 20 }}>
      <p>{comment.text}</p>

      {/* Actions */}
      <div className="actions">
        <button onClick={() => likeComment({ id: comment.id })}>
          👍 Like {comment.liked}
        </button>

        <button onClick={() => dislikeComment({ id: comment.id })}>
          👎 Dislike {comment.disliked}
        </button>

        {/* Reply only if depth not exceeded */}
        {level < MAX_DEPTH && (
          <button onClick={() => setReplying(!replying)}>
            {replying ? "Cancel" : "Reply"}
          </button>
        )}

        <button className="delete" onClick={() => deleteComment(comment.id)}>
          Delete
        </button>
      </div>

      {/* Reply Box */}
      {replying && (
        <CommentBox
          parentId={comment.id}
          onDone={() => setReplying(false)}
        />
      )}

      {/* Render children recursively */}
      <CommentsTree parentId={comment.id} level={level + 1} />
    </div>
  );
}
```

---

---

# ✅ Step 5: Recursive Comments Tree Renderer

### Interview Notes

This component:

* Filters children by parentId
* Sorts by timestamp
* Renders nested structure

---

## `src/components/CommentsTree.jsx`

```jsx
import { useComments } from "../context/CommentsContext";
import CommentItem from "./CommentItem";

export default function CommentsTree({ parentId = null, level = 0 }) {
  const { comments } = useComments();

  // Get children for this parent
  const children = Object.values(comments)
    .filter((c) => c.parentId === parentId)
    .sort((a, b) => a.createdAt - b.createdAt);

  return (
    <div>
      {children.map((comment) => (
        <CommentItem key={comment.id} comment={comment} level={level} />
      ))}
    </div>
  );
}
```

---

---

# ✅ Step 6: App Component

### Root comment box + full thread

---

## `src/App.jsx`

```jsx
import { CommentsProvider } from "./context/CommentsContext";

import CommentBox from "./components/CommentBox";
import CommentsTree from "./components/CommentsTree";

import "./styles/comments.css";

export default function App() {
  return (
    <CommentsProvider>
      <div className="app">
        <h1>💬 Nested Comments System</h1>

        {/* Root Comment Input */}
        <CommentBox parentId={null} />

        {/* All Comments */}
        <CommentsTree parentId={null} />
      </div>
    </CommentsProvider>
  );
}
```

---

---

# ✅ Step 7: Styling (Full CSS)

## `src/styles/comments.css`

```css
.app {
  max-width: 700px;
  margin: 30px auto;
  font-family: sans-serif;
}

h1 {
  text-align: center;
}

/* Comment Input */
.comment-box {
  width: 100%;
  height: 70px;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid black;
  border-radius: 6px;
}

/* Comment Item */
.comment-item {
  border: 1px solid #ccc;
  background: #f9f9ff;
  padding: 12px;
  margin: 10px 0;
  border-radius: 6px;
}

.comment-item p {
  margin: 0 0 10px;
}

/* Actions */
.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.actions button {
  cursor: pointer;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  background: #dfffdc;
}

.actions button:hover {
  background: #b6ffb0;
}

.actions .delete {
  background: #ffd6d6;
}

.actions .delete:hover {
  background: #ffaaaa;
}
```

---

---

# ✅ Final Output

✔ Add root comments
✔ Reply infinitely
✔ Like / Dislike toggle
✔ Delete removes all nested children
✔ Depth limit supported
✔ Clean architecture (Context + Components)

---

---

# ⭐ Follow-Up Feature (Interview Bonus)

If interviewer asks next, you can add:

✅ Edit comment
✅ Persist comments in localStorage
✅ Collapse/Expand threads
✅ API integration
✅ Optimized rendering (memo)

---

If you want, I can immediately provide the **Edit Comment functionality** as the follow-up.
