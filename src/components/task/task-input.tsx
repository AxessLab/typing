import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

export interface ITaskProps extends StateProps, RouteComponentProps<{ url: string }> {}


const TaskInput : React.FC<ITaskProps> = (props : ITaskProps) => {
  const {
    task,
    correctInput,
    wrongInput
  } = props;
  
  const inputEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  })

  const handleKey = event => {
    props.handleKey(event);
  }

  return (
    <>
      <div 
        className="task__input" 
        role="application"
        ref={inputEl} 
        tabIndex={0} 
        onKeyUp={handleKey}>
          {
            <span className={"task__typed-text " +  (correctInput ? 'correct' : '') + (wrongInput ? 'wrong' : '')}>
              {task.typedText}
            </span>
          }
      </div>
    </>
  );
}


const mapStateToProps = ({ task }: IRootState, ownProps) => ({
  task: task.entity,
  handleKey: ownProps.handleKey,
  correctInput: task.correctInput,
  wrongInput: task.wrongInput
});


type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(TaskInput);