import { Chart } from "./chart";
import { MergeData } from "../../MergingService";
import { useState } from "react";
import Schedules from "./schedules";

export function ChartManager({ benchmarks }) {
  const [scoreName, setScoreName] = useState("score");
  const [benchmarksNames, setBenchmarksNames] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(Object.keys(benchmarks).length).fill(false)
  );
  const mergedBenchmarks = MergeData(benchmarks, benchmarksNames);
  const [schedules, setSchedules] = useState([]);

  const handleChartClick = (testcaseId) => {
    const testcase = mergedBenchmarks.mergedBenchmarks.find(
      (testcase) => testcase.testcaseId === testcaseId
    );

    if (testcaseId === null || testcaseId === undefined) {
      setSchedules([]);
      return;
    }

    const schedulesKeys = Object.keys(testcase).filter((key) =>
      key.includes("schedule")
    );

    const _schedules = schedulesKeys.map((scheduleKey) => {
      return {
        name: scheduleKey.slice(0, -9),
        id: testcaseId,
        schedule: testcase[schedulesKeys],
      };
    });

    setSchedules(_schedules);
  };

  const handleOnChange = (position, benchmark) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const updatedBenchmarksNames = benchmarksNames;
    if (!updatedBenchmarksNames.includes(benchmark)) {
      //checking weather array contain the id
      updatedBenchmarksNames.push(benchmark); //adding to array because value doesnt exists
    } else {
      updatedBenchmarksNames.splice(
        updatedBenchmarksNames.indexOf(benchmark),
        1
      ); //deleting
    }

    setBenchmarksNames(updatedBenchmarksNames);
  };

  return (
    <>
      {<Schedules schedules={schedules} />}
      <label className="select" for="select">
        <select
          id="select"
          value={scoreName}
          onChange={(e) => setScoreName(e.target.value)}
        >
          {Object.keys(benchmarks[Object.keys(benchmarks)[0]][0]).map(
            (key, index) => {
              if (key !== "testcaseId")
                return <option value={key}>{key}</option>;
              return <></>;
            }
          )}
        </select>
      </label>
      <Chart
        data={mergedBenchmarks.mergedBenchmarks}
        benchmarksNames={benchmarksNames} /*{mergedBenchmarks.benchmarks}*/
        scoreName={scoreName}
        handleClick={handleChartClick}
      />
      {Object.keys(benchmarks).map((benchmark, index) => {
        return (
          <li key={index}>
            <input
              type="checkbox"
              id={`custom-checkbox-${index}`}
              name={benchmark}
              value={benchmark}
              checked={checkedState[index]}
              onChange={() => handleOnChange(index, benchmark)}
            />
            <label htmlFor={`custom-checkbox-${index}`}>{benchmark}</label>
          </li>
        );
      })}
    </>
  );
}
