import { Chart } from "./chart";
import { useState } from "react";
import Schedules from "./schedules";
import { StatisticsChart } from "./statistics_chart";

export function ChartManager({ mergedBenchmarks, benchmarks, statistics }) {
  const [scoreName, setScoreName] = useState("score");
  const [benchmarksNames, setBenchmarksNames] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(Object.keys(benchmarks).length).fill(false)
  );

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
        schedule: testcase[scheduleKey],
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
      <div>
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
          type="line"
        />
        <StatisticsChart
          data={Object.values(
            benchmarksNames
              .filter((el) => el !== "Bruteforce")
              .reduce(function (o, k) {
                o[k] = statistics[k];
                return o;
              }, {})
          )}
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
      </div>
      <div>{<Schedules schedules={schedules} />}</div>
    </>
  );
}
