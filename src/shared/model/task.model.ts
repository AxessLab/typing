export interface ITask {
  completed?: boolean;
  text?: string
}

export const defaultValue: Readonly<ITask> = {
  completed: false,
  text: 'fjfj'
};
