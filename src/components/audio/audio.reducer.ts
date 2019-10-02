import { Dispatch } from 'redux';

export const ACTION_TYPES = {
  PLAY: 'audio/PLAY',
  ENDED: 'audio/ENDED',
  DONE: 'audio/DONE'
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
    case ACTION_TYPES.DONE:
      return {
        ...state,
        playUrls: [],
        currentIndex: -1
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

  dispatch({
    type: ACTION_TYPES.ENDED,
    payload: currentIndex + 1
  });

  if (currentIndex >= playUrls.length - 1) {
    dispatch({
      type: ACTION_TYPES.DONE,
      payload: -1
    });
  }

};
