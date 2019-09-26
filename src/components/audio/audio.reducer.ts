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
export const playAudio = (urls : string[]) => async (dispatch : Dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.PLAY,
    payload: urls
  });
  return result;
};

export const onAudioEnded = () => async (dispatch : Dispatch,  getState : Function) => {
  const playUrlIndex = getState().audio.currentIndex;
  const playUrls = getState().audio.playUrls;
  let index = 0;
  
  if(playUrls.length > playUrlIndex + 1) {
    index = playUrlIndex + 1;
  }
  const result = await dispatch({
    type: ACTION_TYPES.ENDED,
    payload: index
  });
  return result;
};