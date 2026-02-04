import { useSnackbar } from "./SnackbarContext";
import SnackbarItem from "./SnackbarItem";

const Snackbar = () => {
  const { snackbars, maxSnack, removeSnackbar } = useSnackbar();

  return snackbars.slice(0, maxSnack).map((snack, index) => (
    <SnackbarItem
      key={snack.id}
      {...snack}
      onClose={removeSnackbar}
      offset={index * 48}
    />
  ));
};

export default Snackbar;
