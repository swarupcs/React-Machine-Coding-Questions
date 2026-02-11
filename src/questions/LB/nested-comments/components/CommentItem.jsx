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
