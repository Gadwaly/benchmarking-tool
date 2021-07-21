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

export function StatisticsChart({ data }) {
  console.log(data);
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="score" fill="blue" />;
      <Bar dataKey="processingTime" fill="orange" />;
    </BarChart>
  );
}
