import React from "react";
import { LineChart } from "../../../../components/charts";

const DailyAppointmentsTimelineChart = ({data}) => {
  return (
    <div className="w-full h-full">
      <LineChart data={data}/>
    </div>
  );
};

export default React.memo(DailyAppointmentsTimelineChart);
