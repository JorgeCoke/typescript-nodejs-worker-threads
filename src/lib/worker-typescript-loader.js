const path = require("path");
const { workerData } = require("worker_threads");
require(path.resolve(__dirname, workerData.path));
