import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#fd7e14',
    },
    secondary: {
      main: '#072856',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiTab: {
      root: {
        textTransform: 'capitalize',
        boxShadow: 'none',
      },
    },
  },
});

export default theme;
