import React from 'react';
import Task from './components/task';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App : React.FC = () => {
  return (
    <Router>
      <Route 
        exact path='/' 
        render={props => <Task {...props} />}
      />
    </Router>
  );
}

export default App;