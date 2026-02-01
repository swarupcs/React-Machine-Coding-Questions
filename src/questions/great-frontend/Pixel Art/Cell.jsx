import { COLORS } from './colors';



export default function Cell({
  color,
  isDragging,
  onMark,
}) {
  return (
    <button
      onClick={onMark}
      onMouseDown={onMark}
      onMouseEnter={isDragging ? onMark : undefined}
      style={{
        backgroundColor:
          color != null ? COLORS[color] : undefined,
      }}
      className="grid__cell"
    />
  );
}
