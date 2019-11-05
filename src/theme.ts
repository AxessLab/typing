
import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#3c3c3c'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    },
    h1: {
      fontSize: '5rem'
    }
  }
});

export default theme;
