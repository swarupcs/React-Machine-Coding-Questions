import { useSnackbar } from "./snackbar/SnackbarContext";

const variants = ["success", "error", "default"];

export default function App() {
  const { addSnackbar } = useSnackbar();

  const handleClick = () => {
    const variant = variants[Math.floor(Math.random() * variants.length)];
    addSnackbar({
      message: `This is a ${variant} snackbar`,
      variant
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={handleClick}>Add Snackbar</button>
    </div>
  );
}
