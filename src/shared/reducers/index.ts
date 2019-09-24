import { combineReducers } from 'redux';
import task, { TaskState } from '../../components/task/task.reducer';

export interface IRootState {
  readonly task: TaskState;
}

const rootReducer = combineReducers<IRootState>({
  task
});

export default rootReducer;
