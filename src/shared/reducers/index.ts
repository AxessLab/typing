import { combineReducers } from 'redux';
import task, { ITaskState } from '../../components/task/task.reducer';
import explore, { IExploreState } from '../../components/explore/explore.reducer';
import audio, { IAudioState } from '../../components/audio/audio.reducer';

export interface IRootState {
  readonly task: ITaskState;
  readonly audio: IAudioState;
  readonly explore: IExploreState;
}

export interface IAction {
  type: string,
  payload?: any
}

// Export root reducer
export default combineReducers<IRootState>({ task, audio, explore });
