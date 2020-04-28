import { createMuiTheme } from '@material-ui/core';

import colors from './colors.scss';

export default createMuiTheme({
  palette: {
    primary: {
      main: colors.lightGreen,
    },
    common: {
      black: colors.black,
      white: colors.white,
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
