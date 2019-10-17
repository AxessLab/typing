import React from 'react';
import Explore from './components/explore';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Task from './components/task/task';
import Task1 from './components/task/task1';
import Task2 from './components/task/task2';
import Task3 from './components/task/task3';

import Summary from './components/summary';
import Game from './components/game/game';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' render={() => <Game />} />
        <Route path='/explore' render={props => <Explore {...props} />} />
        <Route exact path='/task' render={props => <Task {...props} />} />
        <Route exact path='/task1' render={props => <Task1 {...props} />} />
        <Route exact path='/task2' render={props => <Task2 {...props} />} />
        <Route exact path='/task3' render={props => <Task3 {...props} />} />
        <Route path="/summary" render={props => <Summary {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
