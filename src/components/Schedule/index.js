import { Day } from "./Period";
import ScheduleRow from "./SceduleRow";

const Schedule = ({ schedule }) => {
  console.log(schedule);
  return (
    <table>
      <thead>
        <tr>
          <th>Day</th>
          {[...Array(12)].map((value, index) => {
            return <th key={index}>{index + 1}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {getTimeTable(getFormattedSchedule(schedule)).map((period, index) => {
          return (
            <ScheduleRow
              key={index}
              schedule={period}
              day={Object.keys(Day)[index]}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const getFormattedSchedule = (schedule) => {
  const foramattedSchedule = [];
  let i = 0;
  schedule.forEach((course, index) => {
    const periods = course.periods;
    periods.forEach((period) => {
      const day = Day[period.day],
        from = period.from,
        to = period.to;

      foramattedSchedule.push({
        id: i++,
        day,
        from,
        to,
        course_name: course.course,
        instructor: course.instructor,
      });
    });
  });
  console.log(foramattedSchedule);
  return foramattedSchedule;
};

const getTimeTable = (schedule) => {
  const ordered = schedule.sort((a, b) => {
    return a.day > b.day || (a.day === b.day && a.from > b.from) ? 1 : -1;
  });
  const res = [];
  for (let i = 0; i < 7; i++) res[i] = [];

  ordered.forEach((period) => {
    res[period.day].push(period);
  });
  console.log("res", res);
  return res;
};

export default Schedule;
