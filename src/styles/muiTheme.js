import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#4ebdb6',
    },
    secondary: {
      main: '#072c4b',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontSize: 12,
  },
  breakpoints: {
    // modify md
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1280,
      xl: 1920,
    },
  },
});
