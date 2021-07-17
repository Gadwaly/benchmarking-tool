import React from "react";
import Schedule from "../Schedule";

export default function Schedules({ schedules, schedules1 }) {
  return (
    <>
      {schedules &&
        schedules.map((schedule, index) => (
          <React.Fragment key={index}>
            <h1>
              {schedule.name} #{schedule.id}
            </h1>
            <Schedule schedule={schedule.schedule} />
          </React.Fragment>
        ))}
    </>
  );
}
