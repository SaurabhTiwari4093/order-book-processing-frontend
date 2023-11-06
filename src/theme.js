import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#088397',
    },
    background: {
      main: '#f6fafa',
      light: "#fff"
    },
    text: {
      main: '#383e45',
      dark: "#000"
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
