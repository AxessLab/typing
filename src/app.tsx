import React from 'react';
import Explore from './components/explore';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Task from './components/task/task';
import Task1 from './components/task/task1';
import Task2 from './components/task/task2';
import Task3 from './components/task/task3';

import Summary from './components/summary';

const App: React.FC = () : React.ReactElement => {
  return (
      <Router>
        <Switch>
          <Route path='/explore' render={props => <Explore {...props} />} />
          <Route exact path='/' render={props => <Task {...props} />} />
          <Route exact path='/1' render={props => <Task1 {...props} />} />
          <Route exact path='/2' render={props => <Task2 {...props} />} />
          <Route exact path='/3' render={props => <Task3 {...props} />} />
          <Route exact path="/summary" render={props => <Summary {...props} />} />
        </Switch>
      </Router>
  );
}

export default App;
