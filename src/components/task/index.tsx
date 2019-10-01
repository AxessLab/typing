import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Task from './task';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route path={match.url} component={Task} />
    </Switch>
  </>
);

export default Routes; 