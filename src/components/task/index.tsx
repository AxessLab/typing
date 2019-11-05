import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Task from './task';
import TaskInstruction from './task-instructions';

const Routes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={TaskInstruction} />
    <Route path={`${match.url}/start`} component={Task} />
  </Switch>
);

export default Routes;
