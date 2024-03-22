import "./lib/env";
import { WorkerData, WorkerOperation, WorkerResult } from "./types/worker";
import { Worker } from "worker_threads";
require("ts-node").register(); // Needed to load TS files into NodeJS Worker Threads

(async function () {
  // Load threads
  const threads = Number(process.env.THREADS || "2");
  const workers: { worker: Worker; result?: WorkerResult }[] = [];

  // Create workers
  for (let i = 0; i < threads; i++) {
    const workerData: WorkerData = {
      index: i,
      name: `Name${i}`,
      path: "../worker.ts",
    };
    const worker = new Worker("./src/lib/worker-typescript-loader.js", {
      workerData,
    });
    worker.on("message", (result: WorkerResult) => {
      workers[result.index].result = result;
    });
    workers.push({ worker, result: undefined });
    console.log(`Worker ${i} created`);
  }

  // Launch workers
  workers.forEach((e, i) => {
    console.log(`Starting worker ${i}...`);
    e.worker.postMessage(WorkerOperation.Start);
  });

  // Wait until finished
  setInterval(() => {
    console.log("Workers in progress...");
    const finalized = workers.every((e) => !!e.result);
    if (finalized) {
      console.log(
        "Finished. Workers results:",
        workers.map((e) => e.result)
      );
      process.exit(0);
    }
  }, 1 * 1000);
})();
