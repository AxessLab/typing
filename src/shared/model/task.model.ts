export interface ITask {
  completed?: boolean;
  text?: string,
  typedText?: string
}

export const defaultValue: Readonly<ITask> = {
  completed: false,
  text: 'fjfjfjjfjjjfjjjfjjjf',
  typedText: ''
};
