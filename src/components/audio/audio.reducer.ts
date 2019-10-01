import { Dispatch } from 'redux';
import { IRootState } from 'shared/reducers';

export const ACTION_TYPES = {
  PLAY: 'audio/PLAY',
  ENDED: 'audio/ENDED'
};

const initialState = {
  playUrls: [],
  currentIndex: 0
};

export type AudioState = Readonly<typeof initialState>;

// Reducer

export default (state: AudioState = initialState, action): AudioState => {
  switch (action.type) {
    case ACTION_TYPES.PLAY:
      return {
        ...state,
        playUrls: action.payload,
        currentIndex: 0
      };
    case ACTION_TYPES.ENDED:
      return {
        ...state,
        currentIndex: action.payload
      };
    default:
      return state;
  }
};

// Actions
export const playAudio = (urls: string[]) => ({
    type: ACTION_TYPES.PLAY,
    payload: urls
});

export const onAudioEnded = () => (dispatch: Dispatch, getState: Function) => {
  const { currentIndex, playUrls } = getState().audio;

  if (currentIndex >= playUrls.length - 1) {
    return null;
  }
  
  dispatch({
    type: ACTION_TYPES.ENDED,
    payload: currentIndex + 1
  });
};