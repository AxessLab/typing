import React from 'react';
import Explore from './components/explore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Task from './components/task';
import Summary from './components/summary';
import Home from './components/home/home';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/explore" render={props => <Explore {...props} />} />
      <Route path="/task" render={props => <Task {...props} />} />
      <Route path="/summary" render={props => <Summary {...props} />} />
    </Switch>
  </Router>
);

export default App;
