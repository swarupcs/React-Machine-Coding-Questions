import { useEffect, useState } from "react";
import { useCountDown } from "./useCountDown";

const Item = ({
  id,
  text,
  completed,
  deleted,
  expireTime,
  updateCompleted,
  deleteTodo,
  updateText,
}) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(text);
  const { hasExpired, time } = useCountDown(expireTime);

  useEffect(() => {
    if (hasExpired && !completed) {
      updateCompleted(id);
    }
  }, [hasExpired, completed, id, updateCompleted]);

  return (
    <div className={`item ${deleted ? "deleted" : ""}`}>
      <div className="circle" onClick={() => !deleted && updateCompleted(id)}>
        {completed && <span>✓</span>}
      </div>

      <div
        className={completed || deleted ? "strike" : ""}
        onDoubleClick={() => !completed && !deleted && setEdit(true)}
      >
        {edit ? (
          <input
            value={editText}
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
            onBlur={() => {
              setEdit(false);
              updateText(id, editText);
            }}
          />
        ) : (
          <>
            <span className="time">{time}</span> {text}
          </>
        )}
      </div>

      <div className="close" onClick={() => deleteTodo(id)}>
        ✕
      </div>
    </div>
  );
};

export default Item;
