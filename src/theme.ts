
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
      fontSize: '2.25rem'
    },
    h2: {
      fontSize: '1.75rem'
    },
    h3: {
      fontSize: '1.375rem'
    },
    h4: {
      fontSize: '1.125rem'
    },
    h5: {
      fontSize: '1rem'
    },
    body1: {
      fontSize: '1.25rem'
    },
    body2: {
      fontSize: '1rem'
    }
  }
});

export default theme;
