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
    { text: "f", correct: false },
    { text: "j", correct: false },
    { text: "j", correct: false },
    { text: "f", correct: false },
    { text: "j", correct: false },
    { text: "j", correct: false },
    { text: "f", correct: false },
    { text: "f", correct: false },
    { text: "f", correct: false },
    { text: "j", correct: false },
    { text: "f", correct: false },
    { text: "f", correct: false },
    { text: "f", correct: false },
    { text: "j", correct: false },
    { text: "f", correct: false }
  ]
};

export const task2value: Readonly<ITask> = {
  completed: false,
  exercise: [
    { text: "ä", correct: false },
    { text: "h", correct: false },
    { text: "k", correct: false },
    { text: "ä", correct: false },
    { text: "l", correct: false },
    { text: "ö", correct: false },
    { text: "ä", correct: false },
    { text: "k", correct: false },
    { text: "l", correct: false },
    { text: "j", correct: false },
    { text: "ö", correct: false },
    { text: "ä", correct: false },
    { text: "h", correct: false },
    { text: "j", correct: false },
    { text: "k", correct: false }
  ]
};
