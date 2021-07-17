import {
  LineChart,
  Legend,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

function selectColor(number) {
  const hue = number * 137.508; // use golden angle approximation
  return `hsl(${hue},50%,75%)`;
}

export function Chart({ data, benchmarksNames, scoreName, handleClick }) {
  const keys = benchmarksNames.map((benchmark) => benchmark + "#" + scoreName);
  const sorted = data.sort((a, b) =>
    a[benchmarksNames[0] + "#" + scoreName] <
    b[benchmarksNames[0] + "#" + scoreName]
      ? 1
      : -1
  );
  return (
    <LineChart
      width={800}
      height={750}
      data={sorted}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      onClick={(e) =>
        handleClick(e ? (e.activeLabel ? e.activeLabel : null) : null)
      }
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="testcaseId" />
      <YAxis />
      <Tooltip />
      <Legend />
      {keys.map((testcase, index) => {
        return (
          <Line
            key={index}
            type="monotone"
            dataKey={testcase}
            stroke={selectColor(Math.floor(Math.random() * 999))}
          />
        );
      })}
    </LineChart>
  );
}
