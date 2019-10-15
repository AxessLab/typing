import { combineReducers } from 'redux';
import task, { ITaskState } from '../../components/task/task.reducer';

export interface IRootState {
  readonly task: ITaskState;
}

export interface IAction {
  type: string,
  payload?: any
}

// Export root reducer
export default combineReducers<IRootState>({ task });
