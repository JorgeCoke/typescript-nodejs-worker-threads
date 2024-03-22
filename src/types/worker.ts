type Worker = {
  index: number;
};

export type WorkerData = {
  name: string;
  path: string;
} & Worker;

export type WorkerResult = {
  result: string;
} & Worker;

export enum WorkerOperation {
  Start = "Start",
}
