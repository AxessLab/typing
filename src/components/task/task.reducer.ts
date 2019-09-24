import { ITask, defaultValue } from '../../shared/model/task.model';
import { Dispatch } from 'redux';

export const ACTION_TYPES = {
  FETCH_TASK_LIST: 'task/FETCH_TASK_LIST',
  FETCH_TASK: 'task/FETCH_TASK',
  CORRECT_INPUT: 'task/CORRECT_INPUT',
  WRONG_INPUT: 'task/WRONG_INPUT',
  COMPLETED: 'task/COMPLETED',
  RESET: 'task/RESET'
};

const initialState = {
  entities: [] as ReadonlyArray<ITask>,
  entity: defaultValue,
  currentPos: 0,
  errors: 0,
};

export type TaskState = Readonly<typeof initialState>;

// Reducer

export default (state: TaskState = initialState, action): TaskState => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_TASK:
      return {
        ...state,
        entity: action.payload.data
      };
    case ACTION_TYPES.CORRECT_INPUT:
      return {
        ...state,
        currentPos: state.currentPos + 1
      };
    case ACTION_TYPES.WRONG_INPUT:
      return {
        ...state,
        errors: state.errors + 1
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

export const getTask = () => {
  return {
    type: ACTION_TYPES.FETCH_TASK,
    payload: {
      completed: false,
      text: 'test'
    }
  };
};

export const handleCorrectInput = () => async (dispatch : Dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.CORRECT_INPUT
  });
  return result;
};

export const handleWrongInput = () => async (dispatch : Dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.WRONG_INPUT
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

export const reset = () => ({
  type: ACTION_TYPES.RESET
});