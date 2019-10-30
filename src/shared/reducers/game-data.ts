import { IAction } from './index';
import logo1 from '../../static/images/Fosauri.svg';
import logo2 from '../../static/images/Onzua.svg';

export const ACTION_TYPES = {
  SET_CHARACTER: 'game/SET_CHARACTER'
};

export interface IGameState {
  gameCharacters: ReadonlyArray<IGameCharacter>
  gameCharacter: IGameCharacter
}

interface IGameCharacter {
  id: number,
  name: string,
  description: string,
  image: string
}

const defaultCharacters: ReadonlyArray<IGameCharacter> = [
  {
    id: 0,
    name: 'Onzua',
    description: 'Gul med stora tänder, och tuppkam. Studsar snabbt med sin svans på tangenterna.',
    image: logo1
  },
  {
    id: 1,
    name: 'Fonsuai',
    description: 'Rosa med två långa armar och fyrkantig kropp. Snabb och når långt på tangenterna.',
    image: logo2
  }
]

const initialState: IGameState = {
  gameCharacters: defaultCharacters,
  gameCharacter: defaultCharacters[0]
}

export default (state: IGameState = initialState, action: IAction): IGameState => {
  switch (action.type) {
    case ACTION_TYPES.SET_CHARACTER: {
      return {
        ...state,
        gameCharacter: state.gameCharacters[action.payload]
      };
    }
    default:
      return state;
  }
};

export const setCharacter = (id: number) => ({
  type: ACTION_TYPES.SET_CHARACTER,
  payload: id
});
