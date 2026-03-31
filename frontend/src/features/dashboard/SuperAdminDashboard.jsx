import React from "react";
import StatusCard from "./components/StatusCard";
import ProfileCard from "./components/ProfileCard";
import Chart from "../../components/charts/Chart";

const SuperAdminDashboard = () => {
  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
      <ProfileCard />
       <StatusCard />

       <div className="mt-5">
        <Chart />
       </div>
       <div className="mt-5">02</div>
    </div>
  );
};

export default SuperAdminDashboard;
