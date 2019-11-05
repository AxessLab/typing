export interface ITask {
  completed?: boolean;
  exercise: ITypedText[];
}

interface ITypedText {
  text: string;
  correct: boolean;
}

export const defaultValue: Readonly<ITask> = {
  completed: false,
  exercise: [
    { text: 'f', correct: false },
    { text: 'j', correct: false },
    { text: 'j', correct: false },
    { text: 'f', correct: false },
    { text: 'j', correct: false },
    { text: 'j', correct: false },
    { text: 'f', correct: false }
  ]
};
