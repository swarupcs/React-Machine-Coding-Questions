export default function Paragraph({ paragraph, typedText }) {
  const letters = paragraph.split("");

  return (
    <p className="paragraph">
      {letters.map((char, index) => {
        const typedChar = typedText[index];

        const isCorrect =
          typedChar?.toLowerCase() === char.toLowerCase();

        let className = "black";

        // If user typed this position
        if (typedChar != null) {
          className = isCorrect ? "valid" : "invalid";
        }

        // If last typed char was wrong → cascade red
        if (typedText.length <= index && typedText.length > 0) {
          const lastTypedIndex = typedText.length - 1;

          const lastTypedChar = typedText[lastTypedIndex];
          const actualChar = letters[lastTypedIndex];

          if (
            lastTypedChar?.toLowerCase() !== actualChar?.toLowerCase()
          ) {
            className = "invalid";
          }
        }

        // Cursor blinking effect
        const showCursor = index === typedText.length;

        return (
          <span
            key={index}
            className={showCursor ? `${className} blink` : className}
          >
            {char}
          </span>
        );
      })}
    </p>
  );
}
