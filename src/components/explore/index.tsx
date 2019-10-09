import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from './explore';
const Routes = ({ match }) => (
  <>
    <Switch>
      <Route path={`${match.url}`} component={Explore} />
    </Switch>
  </>
);

export default Routes; 
