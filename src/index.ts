import "./lib/env";

(function () {
  const threads: string | undefined = process.env.THREADS;
  console.log(threads);
})();
