import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo
} from "react";
import Snackbar from "./Snackbar";

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children, maxSnack = 3 }) => {
  const [snackbars, setSnackbars] = useState([]);

  const addSnackbar = useCallback(
    ({ message, variant = "default", autoCloseDuration }) => {
      const id = Date.now();
      setSnackbars((prev) => [
        ...prev,
        { id, message, variant, autoCloseDuration }
      ]);
    },
    []
  );

  const removeSnackbar = useCallback((id) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      snackbars,
      maxSnack,
      addSnackbar,
      removeSnackbar
    }),
    [snackbars, maxSnack, addSnackbar, removeSnackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw new Error("useSnackbar must be used inside SnackbarProvider");
  }
  return ctx;
};
