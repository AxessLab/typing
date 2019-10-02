import React from 'react';
import { Provider } from 'react-redux';
import initStore from './config/store';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Task from './components/task';
import Summary from './components/summary';

const App: React.FC = (): React.ReactElement => {

  const store = initStore();

  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' render={props => <Task {...props} />} />
        <Route exact path='/summary' render={props => <Summary {...props} />} />
      </Router>
    </Provider>
  );
}

export default App;
