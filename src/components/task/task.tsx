import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

import { getTask, handleCorrectInput, handleWrongInput, completed } from './task.reducer';

import TaskInput from './task-input';

import './task.scss';

export interface ITaskProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const Task = (props) => {
  const {
    currentPos,
    task,
    handleCorrectInput,
    handleWrongInput,
    completed
  } = props;

  const handleKey = (e : any) => {   
    if(e.which !== 0 && !(e.key==="Control") && !(e.key==="Meta") && !(e.key==="Shift") && !(e.key==="Alt")) { //igore modifiers for now, probably bad code
      //Check is correct key is typed or not
      const correctKeyPressed =  e.key.toLowerCase() === task.text.charAt(currentPos);
      correctKeyPressed ? handleCorrectInput() : handleWrongInput();
      
      if( currentPos+1 === task.text.length && correctKeyPressed) {
        task.completed = !task.completed;
        completed(task);
      }
    }
  }
  return (
    <>
      <div className="row flex-center pad-top-60-m pad-top-30">
        <div className="type-here col-4-6">
          <h2>Typing in the Dark</h2>
          <TaskInput handleKey={handleKey} />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ task }: IRootState) => ({
  task: task.entity,
  currentPos: task.currentPos
});

const mapDispatchToProps = {
  getTask,
  handleCorrectInput,
  handleWrongInput,
  completed
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);