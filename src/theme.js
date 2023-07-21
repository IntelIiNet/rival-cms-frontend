import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#00314e",
      // dark color
    },
    secondary: {
      main: "#094c61",
      // light green of
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
