import { Dispatch } from 'redux';
import { IAction } from '../../shared/reducers';
import { ITask } from '../../shared/model/task.model';
import { tasks } from './task.config';

export const ACTION_TYPES = {
  FETCH_TASK_LIST: 'task/FETCH_TASK_LIST',
  FETCH_TASK: 'task/FETCH_TASK',
  NEXT_TASK: 'task/NEXT_TASK',
  SET_TASK: 'task/SET_TASK',
  FETCH_TASK_INSTRUCTION: 'task/TASK_INSTRUCTION',
  CORRECT_INPUT: 'task/CORRECT_INPUT',
  NEXT: 'task/NEXT',
  WRONG_INPUT: 'task/WRONG_INPUT',
  COMPLETED: 'task/COMPLETED',
  RESET: 'task/RESET'
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

const initialState: ITaskState = {
  entities: [] as ReadonlyArray<ITask>,
  entity: tasks[0],
  currentTask: 0,
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
      // tslint:disable-next-line: no-shadowed-variable
      const nextTask: number = state.currentTask + 1;
      localStorage.setItem('currentTask', JSON.stringify(nextTask));
      return {
        ...state,
        entity: tasks[nextTask],
        currentTask: nextTask,
        currentPos: 0
      };
    case ACTION_TYPES.SET_TASK:
      localStorage.setItem(
        'currentTask',
        JSON.stringify(action.payload.exercise.id)
      );
      return {
        ...state,
        entity: action.payload.exercise,
        currentTask: action.payload.exercise.id,
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
      localStorage.setItem('currentTask', JSON.stringify(0));
      return {
        ...initialState,
        currentTask: 0
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

export const setTask = (taskNumber: number): IAction => ({
  type: ACTION_TYPES.SET_TASK,
  payload: {
    completed: false,
    exercise: tasks[taskNumber]
  }
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
