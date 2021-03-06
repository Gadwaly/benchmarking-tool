import React from "react";
import EmptyCells from "../EmptyCells";
import "../Schedule.css";

const ScheduleRow = ({ schedule, day, periodsCount = 12 }) => {
  return (
    <tr>
      <th>{day}</th>

      {schedule.length === 0
        ? EmptyCells(periodsCount)
        : schedule.map((period, i) => {
            return (
              <React.Fragment key={period.id}>
                {EmptyCells(i === 0 ? period.from - 1 : 0)}
                <td colSpan={period.to - period.from + 1} className="period">
                  {period.course_name} - {period.instructor}
                </td>
                {EmptyCells(
                  schedule[i + 1]
                    ? schedule[i + 1].from - period.to - 1
                    : periodsCount - period.to
                )}
              </React.Fragment>
            );
          })}
    </tr>
  );
};

export default ScheduleRow;
