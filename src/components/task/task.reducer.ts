import { Dispatch } from "redux";
import { IAction } from "../../shared/reducers";
import { ITask } from "../../shared/model/task.model";
import keyBigF from "../../static/images/f_button.svg";
import keyBigJ from "../../static/images/j_button.svg";
import keyJ from "../../static/images/j_button_small.svg";
import keyH from "../../static/images/h_button.svg";
import keyK from "../../static/images/k_button.svg";
import keyL from "../../static/images/l_button.svg";
import keyÖ from "../../static/images/ö_button.svg";
import keyÄ from "../../static/images/ä_button.svg";
import keyG from "../../static/images/g_button.svg";
import keyF from "../../static/images/f_button_small.svg";
import keyD from "../../static/images/d_button.svg";
import keyS from "../../static/images/s_button.svg";
import keyA from "../../static/images/a_button.svg";

const tasks: ITask[] = [
  {
    taskId: 0,
    instructions: {
      missionText: "Uppdrag 1",
      missionTextEn: "Mission 1",
      missionSummary: "Uppdrag 1 klart",
      missionSummaryEn: "Mission 1 done",
      missionAlreadyCompleted: "Uppdraget redan slutfört.",
      missionAlreadyCompletedEn: "Mission already completed.",
      character: "karaktär.",
      characterEn: "character.",
      p1a: "Nu ska ",
      p1aEn: "Now ",
      p1b:
        " samla verktyg för att klara av nästa uppdrag. För att hitta dom använd F och J på tangentbordet.",
      p1bEn:
        " needs to collect tools to use on the next mission. To find them use F and J on the keyboard.",
      p2:
        "F och J har små upphöjningar på sina tangenter och sitter i mitten. Känn med pekfingrarna och placera höger pekfinger på J och vänster på F.",
      p2En:
        "F and J have small bumps on their keys and are located in the middle of the keyboard. Search for them with your fore fingers and place your right fore finger on J and your left on F.",
      p3: "Tryck enter för att starta, lycka till!",
      p3En: "Press enter to begin, good luck!",
      img1: keyBigF,
      alt1: "F",
      img2: keyBigJ,
      alt2: "J",
      img3: "",
      alt3: "",
      img4: "",
      alt4: "",
      img5: "",
      alt5: "",
      img6: "",
      alt6: ""
    },
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
    taskId: 1,
    instructions: {
      missionText: "Uppdrag 2",
      missionTextEn: "Mission 2",
      missionSummary: "Uppdrag 2 klart",
      missionSummaryEn: "Mission 2 done",
      missionAlreadyCompleted: "Uppdraget redan slutfört.",
      missionAlreadyCompletedEn: "Mission already completed.",
      character: "karaktär.",
      characterEn: "character.",
      p1a: "Nu ska ",
      p1aEn: "Now ",
      p1b:
        " träna sina reflexer på höger hand. Använd höger hand för att skriva bokstäverna som dyker upp.",
      p1bEn:
        " needs to practice the reflexes on the right hand. Use your right hand to enter the letters that appear.",
      p2:
        "Håll höger pekfinger på J och använd sen resten av fingrarna på K, L , Ö och Ä.",
      p2En:
        "Hold your right index finger on J and then use the rest of your fingers on K, L , Ö, Ä",
      p3: "Tryck enter för att starta, lycka till!",
      p3En: "Press enter to begin, good luck!",
      img1: keyH,
      alt1: "H",
      img2: keyJ,
      alt2: "J",
      img3: keyK,
      alt3: "K",
      img4: keyL,
      alt4: "L",
      img5: keyÖ,
      alt5: "Ö",
      img6: keyÄ,
      alt6: "Ä"
    },
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
  },
  {
    taskId: 2,
    instructions: {
      missionText: "Uppdrag 3",
      missionTextEn: "Mission 3",
      missionSummary: "Uppdrag 3 klart",
      missionSummaryEn: "Mission 3 done",
      missionAlreadyCompleted: "Uppdraget redan slutfört.",
      missionAlreadyCompletedEn: "Mission already completed.",
      character: "karaktär.",
      characterEn: "character.",
      p1a: "Nu ska ",
      p1aEn: "Now ",
      p1b:
        " träna sina reflexer på vänster hand. Använd vänster hand för att skriva bokstäverna som dyker upp.",
      p1bEn:
        " needs to practice the reflexes on the left hand. Use your left hand to enter the letters that appear.",
      p2:
        "Håll vänster pekfinger på F och använd sen resten av fingrarna på D, S , och A.",
      p2En:
        "Hold your left index finger on F and then use the rest of your fingers on A, S , D",
      p3: "Tryck enter för att starta, lycka till!",
      p3En: "Press enter to begin, good luck!",
      img1: keyA,
      alt1: "A",
      img2: keyS,
      alt2: "S",
      img3: keyD,
      alt3: "D",
      img4: keyF,
      alt4: "F",
      img5: keyG,
      alt5: "G",
      img6: "",
      alt6: ""
    },
    completed: false,
    exercise: [
      { text: "f", correct: false },
      { text: "g", correct: false },
      { text: "d", correct: false },
      { text: "a", correct: false },
      { text: "s", correct: false },
      { text: "a", correct: false },
      { text: "s", correct: false },
      { text: "f", correct: false },
      { text: "g", correct: false },
      { text: "s", correct: false },
      { text: "a", correct: false },
      { text: "g", correct: false },
      { text: "s", correct: false },
      { text: "a", correct: false },
      { text: "g", correct: false }
    ]
  },
  {
    taskId: 3,
    instructions: {
      missionText: "Frågesport",
      missionTextEn: "Quiz",
      missionSummary: "Frågesport klart",
      missionSummaryEn: "Frågesport done",
      missionAlreadyCompleted: "Uppdraget redan slutfört.",
      missionAlreadyCompletedEn: "Mission already completed.",
      character: "karaktär.",
      characterEn: "character.",
      p1a: "Nu ska ",
      p1aEn: "Now ",
      p1b:
        " samla verktyg för att klara av nästa uppdrag. För att hitta dom använd F och J på tangentbordet.",
      p1bEn:
        " needs to collect tools to use on the next mission. To find them use F and J on the keyboard.",
      p2:
        "F och J har små upphöjningar på sina tangenter och sitter i mitten. Känn med pekfingrarna och placera höger pekfinger på J och vänster på F.",
      p2En:
        "F and J have small bumps on their keys and are located in the middle of the keyboard. Search for them with your fore fingers and place your right fore finger on J and your left on F.",
      p3: "Tryck enter för att starta, lycka till!",
      p3En: "Press enter to begin, good luck!",
      img1: keyBigF,
      alt1: "F",
      img2: keyBigJ,
      alt2: "J",
      img3: "",
      alt3: "",
      img4: "",
      alt4: "",
      img5: "",
      alt5: "",
      img6: "",
      alt6: ""
    },
    completed: false,
    exercise: [
      { text: "f", correct: false },
      { text: "g", correct: false },
      { text: "d", correct: false },
      { text: "a", correct: false },
      { text: "s", correct: false },
      { text: "a", correct: false },
      { text: "s", correct: false },
      { text: "f", correct: false },
      { text: "g", correct: false },
      { text: "s", correct: false },
      { text: "a", correct: false },
      { text: "g", correct: false },
      { text: "s", correct: false },
      { text: "a", correct: false },
      { text: "g", correct: false },
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
      { text: "f", correct: false },
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

export const ACTION_TYPES = {
  FETCH_TASK_LIST: "task/FETCH_TASK_LIST",
  FETCH_TASK: "task/FETCH_TASK",
  NEXT_TASK: "task/NEXT_TASK",
  FETCH_TASK_INSTRUCTION: "task/TASK_INSTRUCTION",
  CORRECT_INPUT: "task/CORRECT_INPUT",
  NEXT: "task/NEXT",
  WRONG_INPUT: "task/WRONG_INPUT",
  COMPLETED: "task/COMPLETED",
  RESET: "task/RESET"
};

export interface ITaskState {
  entities: readonly ITask[];
  entity: Readonly<ITask>;
  currentTask: number;
  currentPos: number;
  correctInput: boolean;
  wrongInput: boolean;
  errors: number;
}

const getData = localStorage.getItem("Current Task");
let witchTask;

if (typeof getData === "string") {
  witchTask = JSON.parse(getData);
} else {
  localStorage.setItem("Current Task", JSON.stringify(0));
}

const initialState: ITaskState = {
  entities: [] as ReadonlyArray<ITask>,
  entity: tasks[witchTask],
  currentTask: witchTask,
  currentPos: 0,
  correctInput: false,
  wrongInput: false,
  errors: 0
};

// Reducer

export default (
  state: ITaskState = initialState,
  action: IAction
): ITaskState => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_TASK:
      return {
        ...state,
        entity: {
          ...state.entity,
          exercise: action.payload.data
        }
      };
    case ACTION_TYPES.NEXT_TASK:
      const nextTask: number = state.currentTask + 1;
      localStorage.setItem("Current Task", JSON.stringify(nextTask));
      return {
        ...state,
        entity: tasks[nextTask],
        currentTask: nextTask,
        currentPos: 0
      };
    case ACTION_TYPES.CORRECT_INPUT:
      return {
        ...state,
        correctInput: true,
        wrongInput: false
      };
    case ACTION_TYPES.WRONG_INPUT:
      return {
        ...state,
        errors: state.errors + 1,
        correctInput: false,
        wrongInput: true
      };
    case ACTION_TYPES.NEXT:
      return {
        ...state,
        currentPos: state.currentPos + 1,
        wrongInput: false,
        correctInput: false
      };
    case ACTION_TYPES.COMPLETED:
      return {
        ...state,
        entity: {
          ...state.entity,
          completed: true // action.payload.data
        }
      };
    case ACTION_TYPES.RESET:
      localStorage.setItem("Current Task", JSON.stringify(0));
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions

export const getTask = (task: ITask): IAction => ({
  type: ACTION_TYPES.FETCH_TASK,
  payload: {
    completed: false,
    exercise: task
  }
});

export const nextTask = (): IAction => ({
  type: ACTION_TYPES.NEXT_TASK
});

export const handleCorrectInput = (key: string) => async (
  dispatch: Dispatch
): Promise<IAction> => {
  const result = await dispatch({
    type: ACTION_TYPES.CORRECT_INPUT,
    payload: key
  });
  dispatch(next());

  return result;
};

export const handleWrongInput = (key: string) => async (
  dispatch: Dispatch
): Promise<IAction> => {
  const result = await dispatch({
    type: ACTION_TYPES.WRONG_INPUT,
    payload: key
  });

  return result;
};

export const completed = (task: ITask) => async (
  dispatch: Dispatch,
  getState: Function
): Promise<IAction> => {
  const result = await dispatch({
    type: ACTION_TYPES.COMPLETED
  });

  return result;
};

export const next = (): IAction => ({
  type: ACTION_TYPES.NEXT
});

export const reset = (): IAction => ({
  type: ACTION_TYPES.RESET
});
