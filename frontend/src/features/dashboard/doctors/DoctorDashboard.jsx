import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFullName } from "../../../utils/userHelpers";
import { data, statusCardItems } from "./config/doctor.config";
import { StatusCard, ChartWrapper, ProfileCard } from "../components/index";
import DailyAppointmentsTimelineChart from "./charts/DailyAppointmentsTimelineChart";
import PatientStatus from "./charts/PatientStatus";

const DoctorDashboard = () => {
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
          title="Daily Appointments Timeline"
          data={data}
          isLoading={isLoading}
        >
          <DailyAppointmentsTimelineChart data={data} />
        </ChartWrapper>
      </div>

      <div className="text-center mt-5 w-full">
        <ChartWrapper title="Revenue Overview" data={"3"} isLoading={isLoading}>
          <PatientStatus />
        </ChartWrapper>
      </div>
    </div>
  );
};

export default DoctorDashboard;
