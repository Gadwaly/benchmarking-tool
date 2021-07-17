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

        Object.keys(benchmarks[benchmark][res]).map(
          (key) =>
            (mergedBenchmark[`${benchmark}#${key}`] =
              benchmarks[benchmark][res][key])
        );

        mergedBenchmarks.push(mergedBenchmark);
        testcaseIds.add(scores.testcaseId);
      } else {
        mergedBenchmarks = mergedBenchmarks.map((testcase) => {
          if (testcase.testcaseId === scores.testcaseId) {
            Object.keys(benchmarks[benchmark][res]).map(
              (key) =>
                (testcase[`${benchmark}#${key}`] =
                  benchmarks[benchmark][res][key])
            );
          }
          return testcase;
        });
      }
    }
  });
  return { mergedBenchmarks, benchmarks: Object.keys(benchmarks) };
}
