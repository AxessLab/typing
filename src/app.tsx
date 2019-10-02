import React from 'react';
import Task from './components/task';
import Summary from './components/summary';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.scss';

const App : React.FC = () => {
  return (
    <Router>
      <Route
        exact path='/'
        render={props => <Task {...props} />}
      />
      <Route
        exact path='/summary'
        render={props => <Summary {...props} />}
      />
    </Router>
  );
}

export default App;
