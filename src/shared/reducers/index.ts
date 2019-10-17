import { combineReducers } from 'redux';
import task, { ITaskState } from '../../components/task/task.reducer';
import explore, { IExploreState } from '../../components/explore/explore.reducer';
import game, { IGameState } from './game-data';


export interface IRootState {
  readonly task: ITaskState;
  readonly explore: IExploreState;
  readonly game: IGameState;
}

export interface IAction {
  type: string,
  payload?: any
}

// Export root reducer
export default combineReducers<IRootState>({ task, explore, game });
