import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

export interface ITaskProps extends StateProps, RouteComponentProps<{ url: string }> {}


const TaskInput : React.FC<ITaskProps> = (props : ITaskProps) => {
  const {
    task,
    currentPos
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
    <div 
      className="typing-text-input" 
      role="application"
      ref={inputEl} 
      tabIndex={0} 
      onKeyUp={handleKey}>
          <span className="typing-text-input__value-to-type" aria-live="polite">
            {task.text.charAt(currentPos)}
          </span>
          <span>
            {task.text.substr(currentPos+1, task.text.length)}
          </span>
    </div>
  );
}


const mapStateToProps = ({ task }: IRootState, ownProps) => ({
  task: task.entity,
  currentPos: task.currentPos,
  handleKey: ownProps.handleKey
});


type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(TaskInput);