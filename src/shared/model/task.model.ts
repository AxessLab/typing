export interface ITask {
  id: number;
  completed?: boolean;
  exercise: ITypedText[];
  keys: IKey[];
}

interface ITypedText {
  text: string;
  correct: boolean;
}

interface IKey {
  image: string;
  alt: string;
}
