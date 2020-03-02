import React, { Suspense, useEffect } from "react";
import { connect } from 'react-redux';
import { IRootState } from './shared/reducers';
import Explore from "./components/explore";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Task from "./components/task";
import Summary from "./components/summary/summary";
import Home from "./components/home/home";
import { setTask } from './components/task/task.reducer';

const mapStateToProps = ({ task }: IRootState) => ({
});

const mapDispatchToProps = {
  setTask
};

const Start = (props) => {

  useEffect(() => {
    const getData = localStorage.getItem("Current Task");
    let whichTask;

    if (typeof getData === "string") {
      whichTask = JSON.parse(getData);
      props.setTask(whichTask)
    } else {
      localStorage.setItem("Current Task", JSON.stringify(0));
    }
  })


  return (
    <Router>
      <Switch>
        <Route exact path='/' render={props => <Home {...props} />} />
        <Route path='/explore' render={props => <Explore {...props} />} />
        <Route path='/task' render={props => <Task {...props} />} />
        <Route path='/summary' render={props => <Summary {...props} />} />
      </Switch>
    </Router>
  );
};

// loading component for suspense fallback
const Loader = () => <div>loading...</div>;

// here app catches the suspense from page in case translations are not yet loaded
const App = (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <Start setTask={props.setTask} />
    </Suspense>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
