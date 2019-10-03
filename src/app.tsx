import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Task from './components/task';
import Summary from './components/summary';

const App: React.FC = (): React.ReactElement => {
  return (
    <Router>
      <Route exact path='/' render={props => <Task {...props} />} />
      <Route exact path='/summary' render={props => <Summary {...props} />} />
    </Router>
  );
}

export default App;
