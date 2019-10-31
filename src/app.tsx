import React from 'react';
import Explore from './components/explore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Task from './components/task/task';
import Summary from './components/summary';
import Game from './components/game/game';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Game />} />
      <Route path="/explore" render={props => <Explore {...props} />} />
      <Route exact path="/task" render={props => <Task {...props} />} />
      <Route path="/summary" render={props => <Summary {...props} />} />
    </Switch>
  </Router>
);

export default App;
