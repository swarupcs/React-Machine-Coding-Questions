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
