import React from "react";
import { BarChart } from "../../../../components/charts";

const AppointmentTrends = ({ data }) => {
  return (
    <div className="h-full w-full">
      <BarChart
        data={data}
        xKey="name"
        bars={[
          { dataKey: "pv", color: "#8884d8" },
          { dataKey: "uv", color: "#82ca9d" },
        ]}
      />
    </div>
  );
};

export default AppointmentTrends;
