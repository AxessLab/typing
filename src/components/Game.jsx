import React from 'react';
import Task from './task';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Game.scss';

const Game = () => {
  return (
    <Router>
      <Route 
        exact path='/' 
        render={props => <Task {...props} />}
      />
    </Router>
  );
}

export default Game;