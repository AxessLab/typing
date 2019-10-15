import './index.scss'; // Render styles and place in static folder

import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import initStore from './config/store';

import DevTools from './config/devtools'; // When environment is 'development'

import App from './app';

if (process.env.NODE_ENV === 'development') {
  require('react-axe')(React, ReactDOM, 1000);
}

ReactDOM.render(
  <>
    {/* If this slows down the app in dev disable it and enable when required */}
    { process.env.NODE_ENV === 'development' ? <DevTools /> : null }
    <div className="container">
      <App store={initStore()} />
    </div>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
