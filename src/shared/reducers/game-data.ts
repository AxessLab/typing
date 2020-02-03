import { IAction } from "./index";
import logo1 from "../../static/images/ninja_doruk.svg";
import logo2 from "../../static/images/ninja_fousari.svg";
import { ITask } from "shared/model/task.model";

export const ACTION_TYPES = {
  SET_CHARACTER: "game/SET_CHARACTER"
};

export interface IGameState {
  gameCharacters: ReadonlyArray<IGameCharacter>;
  gameCharacter: IGameCharacter;
}

interface IGameCharacter {
  id: number;
  name: string;
  description: string;
  image: string;
}

const defaultCharacters: ReadonlyArray<IGameCharacter> = [
  {
    id: 0,
    name: "Doruk",
    description:
      "Gröna kläder, vit käpp i handen som används för att hitta tangenterna snabbt i mörkret. Doruks specialitet är snabba reflexer.",
    image: logo1
  },
  {
    id: 1,
    name: "Fousari",
    description:
      "Lila kläder och vita pinnar i händerna. Fousaris specialitet är kombos med båda händerna.",
    image: logo2
  }
];

export const tasks: ITask[] = [
  {
    completed: false,
    exercise: [
      {
        text: "f",
        correct: false
      },
      { text: "j", correct: false },
      { text: "j", correct: false },
      { text: "f", correct: false },
      { text: "j", correct: false },
      { text: "j", correct: false },
      { text: "f", correct: false },
      { text: "f", correct: false },
      { text: "f", correct: false },
      { text: "j", correct: false },
      { text: "f", correct: false },
      { text: "f", correct: false },
      { text: "f", correct: false },
      { text: "j", correct: false },
      { text: "f", correct: false }
    ]
  },
  {
    completed: false,
    exercise: [
      { text: "ä", correct: false },
      { text: "h", correct: false },
      { text: "k", correct: false },
      { text: "ä", correct: false },
      { text: "l", correct: false },
      { text: "ö", correct: false },
      { text: "ä", correct: false },
      { text: "k", correct: false },
      { text: "l", correct: false },
      { text: "j", correct: false },
      { text: "ö", correct: false },
      { text: "ä", correct: false },
      { text: "h", correct: false },
      { text: "j", correct: false },
      { text: "k", correct: false }
    ]
  }
];

const initialState: IGameState = {
  gameCharacters: defaultCharacters,
  gameCharacter: defaultCharacters[0]
};

export default (
  state: IGameState = initialState,
  action: IAction
): IGameState => {
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
