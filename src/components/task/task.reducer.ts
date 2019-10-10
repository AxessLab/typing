import { Dispatch } from 'redux';
import { IAction } from '../../shared/reducers';
import { ITask, defaultValue } from '../../shared/model/task.model';

export const ACTION_TYPES = {
  FETCH_TASK_LIST: 'task/FETCH_TASK_LIST',
  FETCH_TASK: 'task/FETCH_TASK',
  CORRECT_INPUT: 'task/CORRECT_INPUT',
  NEXT: 'task/NEXT',
  WRONG_INPUT: 'task/WRONG_INPUT',
  COMPLETED: 'task/COMPLETED',
  RESET: 'task/RESET'
};

export interface ITaskState {
  entities: readonly ITask[],
  entity: Readonly<ITask>,
  currentPos: number,
  correctInput: boolean,
  wrongInput: boolean
  errors: number
}

const initialState: ITaskState = {
  entities: [] as ReadonlyArray<ITask>,
  entity: defaultValue,
  currentPos: 0,
  correctInput: false,
  wrongInput: false,
  errors: 0,
};

// Reducer

export default (state: ITaskState = initialState, action: IAction): ITaskState => {
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
          completed: true //action.payload.data
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

export const getTask = (task: string): IAction => {
  return {
    type: ACTION_TYPES.FETCH_TASK,
    payload: {
      completed: false,
      text: task
    }
  };
};

export const handleCorrectInput = (key: string) => async (dispatch: Dispatch): Promise<IAction> => {
  const result = await dispatch({
    type: ACTION_TYPES.CORRECT_INPUT,
    payload: key
  });

  setTimeout(() => {
    dispatch(next())
  }, 250);

  return result;
};

export const handleWrongInput = (key: string) => async (dispatch: Dispatch): Promise<IAction> => {
  const result = await dispatch({
    type: ACTION_TYPES.WRONG_INPUT,
    payload: key
  });

  return result;
};

export const completed = (task: ITask) => async (dispatch: Dispatch, getState: Function): Promise<IAction> => {
  const result = await dispatch({
    type: ACTION_TYPES.COMPLETED
  })

  return result;
};


export const next = (): IAction => ({
  type: ACTION_TYPES.NEXT
});

export const reset = (): IAction => ({
  type: ACTION_TYPES.RESET
});
