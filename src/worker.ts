import { parentPort, workerData } from "worker_threads";
import { sleep } from "./utils";
import { WorkerData, WorkerOperation, WorkerResult } from "./types/worker";

const start = async (inputData: WorkerData) => {
  console.log(`[Thread ${inputData.index}] Running...`);
  await sleep(10000 * Math.random());
  const computedResult = `Hello ${inputData.name}!`;
  const result: WorkerResult = {
    index: inputData.index,
    result: computedResult,
  };
  parentPort?.postMessage(result);
};

parentPort?.once("message", (operation: WorkerOperation) => {
  const inputData = workerData as WorkerData;
  if (operation === WorkerOperation.Start) {
    start(inputData);
  }
});
