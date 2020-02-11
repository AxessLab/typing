export interface ITask {
  completed?: boolean;
  exercise: ITypedText[];
  instructions: ITaskInstructions;
  taskId: number;
}

interface ITypedText {
  text: string;
  correct: boolean;
}

interface ITaskInstructions {
  missionText: string;
  missionTextEn: string;
  missionSummary: string;
  missionSummaryEn: string;
  missionAlreadyCompleted: string;
  missionAlreadyCompletedEn: string;
  character: string;
  characterEn: string;
  p1a: string;
  p1aEn: string;
  p1b: string;
  p1bEn: string;
  p2: string;
  p2En: string;
  p3: string;
  p3En: string;
  img1: string;
  alt1: string;
  img2: string;
  alt2: string;
  img3: string;
  alt3: string;
  img4: string;
  alt4: string;
  img5: string;
  alt5: string;
  img6: string;
  alt6: string;
}
