import "./App.css";
import benchmarks from "./benchmarks.json";
import { ChartManager } from "./components/chart_mangager";
import { MergeData } from "./MergingService";
import { generateStatistics } from "./statisticsService";
// import { useState } from "react";
// import {
//   AreaChart,
//   Area,
//   Tooltip,
//   CartesianGrid,
//   XAxis,
//   YAxis,
// } from "recharts";

function App() {
  // const [benchmarkName, setBenchmarkName] = useState("");
  // const [benchmarkResults, setBenchmarkResults] = useState([]);

  // const startBenchmar666king = () => {};
  const editedBenchmarks = {};
  Object.keys(benchmarks).forEach((benchmark) => {
    editedBenchmarks[benchmark] = benchmarks[benchmark].results;
  });
  // const editedBenchmarks = benchmarks;
  const mergedBenchmarks = MergeData(
    editedBenchmarks,
    Object.keys(editedBenchmarks)
  );
  mergedBenchmarks.mergedBenchmarks = mergedBenchmarks.mergedBenchmarks.filter(
    (testcase) => testcase["not-matched"] === undefined
  );
  mergedBenchmarks.benchmarks.forEach((benchmarkName) => {
    console.log(
      benchmarkName,
      mergedBenchmarks.mergedBenchmarks.reduce(
        (accumulator, mergedBenchmark) => {
          return accumulator + mergedBenchmark[benchmarkName + "#score"];
        },
        0
      ) / mergedBenchmarks.mergedBenchmarks.length
    );
  });
  console.log(mergedBenchmarks);
  const statistics = generateStatistics(mergedBenchmarks, 1.5);
  return (
    // <div class="container py-4">
    //   <div class="row justify-content-center">
    //     <div class="col-4">
    //       <input
    //         class="w-100 form-control"
    //         type="text"
    //         placeholder="Test Name"
    //         value={benchmarkName}
    //         onChange={(e) => setBenchmarkName(e.target.value)}
    //       />
    //     </div>
    //     <div class="col-1">
    //       <button onClick={startBenchmarking} class="btn btn-primary">
    //         Start
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <ChartManager
      mergedBenchmarks={mergedBenchmarks}
      benchmarks={editedBenchmarks}
      statistics={statistics}
    />
  );
}

export default App;
