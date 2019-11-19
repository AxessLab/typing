import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import initStore from './config/store';
import { Provider } from 'react-redux';
import DevTools from './config/devtools'; // When environment is 'development'
import App from './app';
import { Container, CssBaseline } from '@material-ui/core';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import './i18n';

if (process.env.NODE_ENV === 'development') {
  require('react-axe')(React, ReactDOM, 1000);
}
const store = initStore();

ReactDOM.render(
  <Provider store={store}>
    {/* If this slows down the app in dev disable it and enable when required */}
    { process.env.NODE_ENV === 'development' ? <DevTools /> : null }
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <App />
      </Container>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
