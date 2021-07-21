export function generateStatistics(mergedBenchmarks, threshold = 0.5) {
  const statistics = {};
  const processingTimes = {};
  // console.log(mergedBenchmarks.mergedBenchmarks, mergedBenchmarks.benchmarks);
  const benchmarks = mergedBenchmarks.benchmarks;

  if (benchmarks.indexOf("Bruteforce") === -1) return;

  //Bruteforce#score
  //[csp#score, csp1#score]
  mergedBenchmarks.mergedBenchmarks.forEach((mergedBenchmark) => {
    const keys = Object.keys(mergedBenchmark).filter(
      (key) => key.includes("#score") | key.includes("#processingTime")
    );
    if (keys.indexOf("Bruteforce#score") === -1) return;

    for (let i = 0; i < keys.length; i++) {
      if (keys[i].includes("#score")) {
        if (keys[i] === "Bruteforce#score") continue;
        if (statistics[keys[i]] === undefined) statistics[keys[i]] = 0;
        statistics[keys[i]] +=
          Math.abs(
            mergedBenchmark[keys[i]] - mergedBenchmark["Bruteforce#score"]
          ) < threshold;
      } else {
        if (processingTimes[keys[i]] === undefined)
          processingTimes[keys[i]] = 0;
        processingTimes[keys[i]] += mergedBenchmark[keys[i]];
      }
    }
  });

  Object.keys(processingTimes).forEach((key) => {
    if (processingTimes["Bruteforce#processingTime"] === undefined) return;
    statistics[key] =
      processingTimes[key] / processingTimes["Bruteforce#processingTime"];
  });

  return unmergeStatistics(
    statistics,
    benchmarks,
    mergedBenchmarks.mergedBenchmarks.length
  );
}

function unmergeStatistics(statistics, benchmarks, testCasesCount) {
  const unmerged = {};
  benchmarks.forEach((benchmark) => {
    if (benchmark === "Bruteforce") return;
    Object.keys(statistics).forEach((statistic) => {
      if (statistic.includes(benchmark)) {
        if (unmerged[benchmark] === undefined) {
          unmerged[benchmark] = {};
          unmerged[benchmark]["name"] = benchmark;
        }
        if (statistic.includes("#score"))
          unmerged[benchmark]["score"] =
            (statistics[statistic] / testCasesCount) * 100;
        if (statistic.includes("#processingTime"))
          unmerged[benchmark]["processingTime"] = statistics[statistic] * 100;
      }
    });
  });
  return unmerged;
}
