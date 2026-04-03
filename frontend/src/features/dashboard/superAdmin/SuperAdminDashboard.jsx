import React, { useEffect, useState } from "react";
import {StatusCard, ProfileCard} from "../components/index.js";
import { statusCardItems, superAdminData } from "./config/superAdmin.config";
import { useSelector } from "react-redux";
import { getFullName } from "../../../utils/userHelpers";
import ChartWrapper from "../components/ChartWrapper";
import AppointmentTrends from "./charts/AppointmentTrends";
import RevenueOverview from "./charts/RevenueOverview";


const SuperAdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const fullName = getFullName(user);

  // useEffect(() => {
  //   // Simulate data fetching
  //   setIsLoading(true);
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000); // Simulate a 2-second loading time

  //   return () => clearTimeout(timer); // Cleanup the timer on unmount
  // }, []);

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
      <ProfileCard fullName={fullName} />
      <StatusCard statusCardItems={statusCardItems} />

      <div className="text-center mt-5 w-full">
        <ChartWrapper
          title="Appointment Trends"
          data={superAdminData}
          isLoading={isLoading}
        >
          <AppointmentTrends data={superAdminData} />
        </ChartWrapper>
      </div>

      <div className="text-center mt-5 w-full">
        <ChartWrapper title="Revenue Overview" data={"5"} isLoading={isLoading}>
          <RevenueOverview />
        </ChartWrapper>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
