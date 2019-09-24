import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import initStore from './config/store';
import './index.scss';
import DevTools from './config/devtools';
import Game from './components/Game';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV !== 'production') {
  var axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}  

const store = initStore();
const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const rootEl = document.getElementById('root');


const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <div>
        {/* If this slows down the app in dev disable it and enable when required  */}
        {devTools}
        <Component />
      </div>
    </Provider>,
    rootEl
  );

render(Game);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
