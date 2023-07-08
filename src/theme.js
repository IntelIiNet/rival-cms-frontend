import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#2D3748",
    },
    secondary: {
      main: "#EBF8FF",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
