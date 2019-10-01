import { combineReducers } from 'redux';
import task, { TaskState } from '../../components/task/task.reducer';
import audio, { AudioState } from '../../components/audio/audio.reducer';

export interface IRootState {
  readonly task: TaskState;
  readonly audio: AudioState;
}

const rootReducer = combineReducers<IRootState>({
  task,
  audio
});

export default rootReducer;
