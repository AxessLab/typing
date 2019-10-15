import React from 'react';
import Explore from './components/explore';

import { Store, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { IRootState } from 'shared/reducers';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Task from './components/task/task';
import Task1 from './components/task/task1';
import Task2 from './components/task/task2';
import Task3 from './components/task/task3';

import Summary from './components/summary';

interface IProps {
  store: Store<IRootState, AnyAction> & { dispatch: unknown }
}

const App: React.FC<React.PropsWithChildren<IProps>> = ({ store }: React.PropsWithChildren<IProps>): React.ReactElement => {
  return (
    <Provider store={store}>
      <Router>
        <Route path='/explore' render={props => <Explore {...props} />} />
        <Route exact path='/' render={props => <Task {...props} />} />
        <Route exact path='/1' render={props => <Task1 {...props} />} />
        <Route exact path='/2' render={props => <Task2 {...props} />} />
        <Route exact path='/3' render={props => <Task3 {...props} />} />
        <Route exact path="/summary" render={props => <Summary {...props} />} />
      </Router>
    </Provider>
  );
}

export default App;
