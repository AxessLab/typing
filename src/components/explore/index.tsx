import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from './explore';
import ExploreMenu from './explore-menu';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/:id`} component={Explore} />
      <Route path={`${match.url}`} component={ExploreMenu} />
    </Switch>
  </>
);

export default Routes; 
