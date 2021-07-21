import {
  LineChart,
  BarChart,
  Bar,
  Legend,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
const Colors = {};
Colors.names = {
  black: "#000000",
  blue: "#0000ff",
  brown: "#a52a2a",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkviolet: "#9400d3",
  fuchsia: "#ff00ff",
  gold: "#ffd700",
  green: "#008000",
  indigo: "#4b0082",
  khaki: "#f0e68c",
  lime: "#00ff00",
  magenta: "#ff00ff",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  orange: "#ffa500",
  pink: "#ffc0cb",
  purple: "#800080",
  violet: "#800080",
  red: "#ff0000",
  silver: "#c0c0c0",
  yellow: "#ffff00",
};

Colors.random = function () {
  var result;
  var count = 0;
  for (var prop in this.names) if (Math.random() < 1 / ++count) result = prop;
  return result;
};
export function Chart({ data, benchmarksNames, scoreName, handleClick, type }) {
  const keys = benchmarksNames.map((benchmark) => benchmark + "#" + scoreName);
  const sorted = data.sort((a, b) =>
    a[benchmarksNames[0] + "#" + scoreName] <
    b[benchmarksNames[0] + "#" + scoreName]
      ? 1
      : -1
  );
  if (type === "line")
    return (
      <LineChart
        width={1000}
        height={800}
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
              stroke={Colors.random()}
              dot={false}
              strokeWidth={0.5}
            />
          );
        })}
      </LineChart>
    );
  else if (type === "bar")
    return (
      <BarChart
        width={730}
        height={250}
        data={data}
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
          return <Bar key={index} dataKey={testcase} fill={Colors.random()} />;
        })}
      </BarChart>
    );
  else return null;
}
