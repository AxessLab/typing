import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Explore from './components/explore';
import Task from './components/task';
import Summary from './components/summary';

const App: React.FC = (): React.ReactElement => {
  return (
    <Router>
      <Switch>
        <Route path='/task' render={props => <Task {...props} />} />
        <Route path='/summary' render={props => <Summary {...props} />} />
        <Route path='/explore' render={props => <Explore {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
