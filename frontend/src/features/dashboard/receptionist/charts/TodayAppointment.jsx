import React from "react";
import { PieChart } from "../../../../components/charts";

// #region Sample data
const data = [
  { name: "Appointments", value: 400 },
  { name: "Reposts", value: 300 },
  { name: "Canceled", value: 100 },
];
// #endregion

const TodayAppointment = () => {
  return (
    <div className="w-full h-full">
      <PieChart data={data} />
    </div>
  );
};

export default React.memo(TodayAppointment);
