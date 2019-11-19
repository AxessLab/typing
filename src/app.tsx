import React, { Suspense } from 'react';
import Explore from './components/explore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Task from './components/task';
import Summary from './components/summary/summary';
import Home from './components/home/home';

const Start = () => {
  return (<Router>
    <Switch>
      <Route exact path="/" render={props => <Home {...props} />} />
      <Route path="/explore" render={props => <Explore {...props} />} />
      <Route path="/task" render={props => <Task {...props} />} />
      <Route path="/summary" render={props => <Summary {...props} />} />
    </Switch>
  </Router>
); };

// loading component for suspense fallback
const Loader = () => (
  <div>loading...</div>
);

// here app catches the suspense from page in case translations are not yet loaded
const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Start />
    </Suspense>
  );
}

export default App;
