import { IAction } from './index';

export const ACTION_TYPES = {
  SET_CHARACTER: 'game/SET_CHARACTER'
};

const initialState = {
  character: '',
  inProduction: true
};

export type IGameState = Readonly<typeof initialState>;

export default (state: IGameState = initialState, action: IAction): IGameState => {
  switch (action.type) {
    case ACTION_TYPES.SET_CHARACTER: {
      const { data } = action.payload;
      return {
        ...state,
        character: data.name
      };
    }
    default:
      return state;
  }
};

export const setCharacter = (name: string) => ({
  type: ACTION_TYPES.SET_CHARACTER,
  payload: name
});
