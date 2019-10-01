import { Dispatch } from 'redux';

export const ACTION_TYPES = {
  PLAY: 'audio/PLAY',
  ENDED: 'audio/ENDED'
};

export interface IAudioState {
  playUrls: string[],
  currentIndex: number
}

const initialState: IAudioState = {
  playUrls: [],
  currentIndex: 0
};

// Reducer

export default (state: IAudioState = initialState, action): IAudioState => {
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
