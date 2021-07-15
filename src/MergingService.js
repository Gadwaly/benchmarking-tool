export function MergeData(benchmarks, benchmarksNames) {
  let mergedBenchmarks = [];
  const testcaseIds = new Set();
  benchmarksNames.forEach((benchmark) => {
    for (let res in benchmarks[benchmark]) {
      const scores = benchmarks[benchmark][res];

      if (!testcaseIds.has(scores.testcaseId)) {
        mergedBenchmarks.push({
          testcaseId: scores.testcaseId,
          [`${benchmark}_score`]: benchmarks[benchmark][res]["score"],
          [`${benchmark}_visits`]: benchmarks[benchmark][res]["visits"],
          [`${benchmark}_processingTime`]:
            benchmarks[benchmark][res]["processingTime"],
        });

        testcaseIds.add(scores.testcaseId);
      } else {
        mergedBenchmarks = mergedBenchmarks.map((testcase) => {
          if (testcase.testcaseId === scores.testcaseId) {
            testcase[`${benchmark}_score`] =
              benchmarks[benchmark][res]["score"];
            testcase[`${benchmark}_visits`] =
              benchmarks[benchmark][res]["visits"];
            testcase[`${benchmark}_processingTime`] =
              benchmarks[benchmark][res]["processingTime"];
          }
          return testcase;
        });
      }
    }
  });
  return { mergedBenchmarks, benchmarks: Object.keys(benchmarks) };
}
