export type WorkerData = {
  index: number;
  name: string;
  path: string;
};

export type WorkerResult = {
  index: number;
  result: string;
};

export enum WorkerOperation {
  Start = "Start",
}
