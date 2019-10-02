import { ITask, defaultValue } from '../../shared/model/task.model';
import { Dispatch } from 'redux';

export const ACTION_TYPES = {
  FETCH_TASK_LIST: 'task/FETCH_TASK_LIST',
  FETCH_TASK: 'task/FETCH_TASK',
  CORRECT_INPUT: 'task/CORRECT_INPUT',
  NEXT: 'task/NEXT',
  WRONG_INPUT: 'task/WRONG_INPUT',
  COMPLETED: 'task/COMPLETED',
  RESET: 'task/RESET'
};

const initialState = {
  entities: [] as ReadonlyArray<ITask>,
  entity: defaultValue,
  currentPos: 0,
  correctInput: false,
  wrongInput: false,
  errors: 0,
};

export type TaskState = Readonly<typeof initialState>;

// Reducer

export default (state: TaskState = initialState, action): TaskState => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_TASK:
      return {
        ...state,
        entity: {
          ...state.entity,
          text: action.payload.data
        }
      };
    case ACTION_TYPES.CORRECT_INPUT:
      return {
        ...state,
        correctInput: true,
        wrongInput: false,
        entity: {
          ...state.entity,
          typedText: action.payload
        }
      };
    case ACTION_TYPES.WRONG_INPUT:
      return {
        ...state,
        errors: state.errors + 1,
        correctInput: false,
        wrongInput: true,
        entity: {
          ...state.entity,
          typedText: action.payload
        }
      };
    case ACTION_TYPES.NEXT:
      return {
        ...state,
        currentPos: state.currentPos + 1,
        wrongInput: false,
        correctInput: false,
        entity: {
          ...state.entity,
          typedText: ''
        }
      };
    case ACTION_TYPES.COMPLETED:
      return {
        ...state,
        entity: {
          ...state.entity,
          completed: action.payload.data
        }
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

export const getTask = (task : string) => {
  return {
    type: ACTION_TYPES.FETCH_TASK,
    payload: {
      completed: false,
      text: task
    }
  };
};

export const handleCorrectInput = (key : string) => async (dispatch : Dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.CORRECT_INPUT,
    payload: key
  });
  setTimeout(() => {
    dispatch(next())
  }, 250);
  return result;
};

export const handleWrongInput = (key : string) => async (dispatch : Dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.WRONG_INPUT,
    payload: key
  });
  return result;
};

export const completed = (task : ITask) => async (dispatch : Dispatch, getState : Function) => {
  //todo: Should not be an alert only
  const errors = getState().task.errors;
  errors === 0 ? alert("Jättebra jobbat! Felfri!") : alert("Bra jobbat! Bara "+errors+" fel.");
  
  const result = await dispatch({
    type: ACTION_TYPES.COMPLETED,
    payload: task.completed
  })
  dispatch(reset());
  return result;
};


export const next = () => ({
  type: ACTION_TYPES.NEXT
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});