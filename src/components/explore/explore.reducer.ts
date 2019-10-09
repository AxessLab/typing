import { Dispatch } from 'redux';
import { IAction } from '../../shared/reducers';

export const ACTION_TYPES = {
  COMPLETED: 'explore/COMPLETED',
  STOP_ANIMATE: 'explore/STOP_ANIMATE',
  START_ANIMATE: 'explore/START_ANIMATE',
  RESET: 'explore/RESET',
};

export interface IExploreState {
  completed: boolean,
  isAnimating: boolean
}

const initialState: IExploreState = {
  completed: false,
  isAnimating: false,
};

// Reducer

export default (state: IExploreState = initialState, action: IAction): IExploreState => {
  switch (action.type) {
    case ACTION_TYPES.COMPLETED:
      return {
        ...state,
        completed: true //action.payload.data
      };
    case ACTION_TYPES.START_ANIMATE:
      return {
        ...state,
        isAnimating: true //action.payload.data
      };
    case ACTION_TYPES.STOP_ANIMATE:
      return {
        ...state,
        isAnimating: false
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions

export const completed = () => async (dispatch: Dispatch): Promise<IAction> => {
  const result = await dispatch({
    type: ACTION_TYPES.COMPLETED
  })

  return result;
};

export const startAnimate = () => async (dispatch: Dispatch): Promise<IAction> => {
  const result = await dispatch({
    type: ACTION_TYPES.START_ANIMATE
  })

  return result;
};


export const stopAnimate = () => async (dispatch: Dispatch): Promise<IAction> => {
  const result = await dispatch({
    type: ACTION_TYPES.STOP_ANIMATE
  })

  return result;
};

export const reset = (): IAction => ({
  type: ACTION_TYPES.RESET
});
