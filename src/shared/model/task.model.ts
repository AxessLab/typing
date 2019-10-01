export interface ITask {
  completed?: boolean;
  text?: string,
  correctInput?: boolean,
  typedText?: string
}

export const defaultValue: Readonly<ITask> = {
  completed: false,
  text: 'fjfj',
  correctInput: false,
  typedText: ''
};
