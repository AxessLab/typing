import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Summary from './summary';

const Routes = ({ match }) => (
  <Switch>
    <Route path={match.url} component={Summary} />
  </Switch>
);

export default Routes;
