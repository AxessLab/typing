export interface ITask {
  completed?: boolean;
  exercise: ITypedText[];
}

interface ITypedText {
  text: string;
  correct: boolean;
}
