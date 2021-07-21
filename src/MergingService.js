export function MergeData(benchmarks, benchmarksNames) {
  let mergedBenchmarks = [];
  const testcaseIds = new Set();
  benchmarksNames.forEach((benchmark) => {
    for (let res in benchmarks[benchmark]) {
      const scores = benchmarks[benchmark][res];

      if (!testcaseIds.has(scores.testcaseId)) {
        let mergedBenchmark = {
          testcaseId: scores.testcaseId,
        };

        Object.keys(benchmarks[benchmark][res]).forEach((key) => {
          let newKey = key;
          if (key !== "registerdCourses") newKey = `${benchmark}#${key}`;
          mergedBenchmark[newKey] = benchmarks[benchmark][res][key];
        });

        mergedBenchmarks.push(mergedBenchmark);
        testcaseIds.add(scores.testcaseId);
      } else {
        mergedBenchmarks = mergedBenchmarks.map((testcase) => {
          if (testcase.testcaseId === scores.testcaseId) {
            if (
              testcase["registerdCourses"] !==
              benchmarks[benchmark][res]["registerdCourses"]
            )
              testcase["not-matched"] = true;
            Object.keys(benchmarks[benchmark][res]).forEach((key) => {
              testcase[`${benchmark}#${key}`] = benchmarks[benchmark][res][key];
            });
          }
          return testcase;
        });
      }
    }
  });

  console.log(mergedBenchmarks);
  return { mergedBenchmarks, benchmarks: Object.keys(benchmarks) };
}
