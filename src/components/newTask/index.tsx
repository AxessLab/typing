import React from "react";
import { Switch, Route } from "react-router-dom";
import Task2 from "./task2";
import Task2Instruction from "./task2-instructions";
import Task2CountDown from "./task2-countdown";

const Routes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={Task2Instruction} />
    <Route
      path={`${match.url}/prestart`}
      render={props => (
        <Task2CountDown to='/task2/start' startTime={3} {...props} />
      )}
    />
    <Route path={`${match.url}/start`} component={Task2} />
  </Switch>
);

export default Routes;
