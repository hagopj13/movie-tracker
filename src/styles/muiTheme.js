import { createMuiTheme } from '@material-ui/core';

import colors from './colors.scss';

export default createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontSize: 12,
  },
  palette: {
    primary: {
      main: colors.green,
    },
    common: {
      black: colors.black,
      white: colors.white,
    },
  },
});
