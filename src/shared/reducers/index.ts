import { combineReducers } from 'redux';
import task, { ITaskState } from '../../components/task/task.reducer';
import audio, { IAudioState } from '../../components/audio/audio.reducer';

export interface IRootState {
  readonly task: ITaskState;
  readonly audio: IAudioState;
}

// Export root reducer
export default combineReducers<IRootState>({ task, audio });
