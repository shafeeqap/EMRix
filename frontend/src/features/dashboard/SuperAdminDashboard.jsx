import React from "react";
import StatusCard from "./components/StatusCard";
import ProfileCard from "./components/ProfileCard";

const SuperAdminDashboard = () => {
  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
      <ProfileCard />
       <StatusCard />
    </div>
  );
};

export default SuperAdminDashboard;
