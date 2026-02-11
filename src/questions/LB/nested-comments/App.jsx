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
