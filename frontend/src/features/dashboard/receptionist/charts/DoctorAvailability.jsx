import React from "react";
import { BarChart } from "../../../../components/charts";

const DoctorAvailability = ({ data }) => {
  return (
    <div className="h-full w-full">
      <BarChart
        data={data}
        xKey="name"
        bars={[
          { dataKey: "available", color: "#82ca9d" },
          { dataKey: "busy", color: "#8884d8" },
        ]}
      />
    </div>
  );
};

export default DoctorAvailability;
