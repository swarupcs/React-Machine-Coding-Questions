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
