import './app.scss';

import React from 'react';
import { Provider } from 'react-redux';
import initStore from './config/store';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Task from './components/task';

const App: React.FunctionComponent = (): React.ReactElement => {

  const store = initStore();

  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' render={props => <Task {...props} />} />
      </Router>
    </Provider>
  );
}

export default App;
