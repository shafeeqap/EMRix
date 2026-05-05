import React from "react";
import { useSelector } from "react-redux";
import { getFullName } from "../../../utils/userHelpers";
import { data, statusCardItems } from "./config/doctor.config";
import { StatusCard, ChartWrapper, ProfileCard } from "../components/index";
import DailyAppointmentsTimelineChart from "./charts/DailyAppointmentsTimelineChart";
import PatientStatus from "./charts/PatientStatus";

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const fullName = getFullName(user);

  console.log(user);

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
      <ProfileCard fullName={fullName} />
      <StatusCard statusCardItems={statusCardItems} role={user.role} />

      <div className="text-center mt-5 w-full">
        <ChartWrapper title="Daily Appointments Timeline" data={data}>
          <DailyAppointmentsTimelineChart data={data} />
        </ChartWrapper>
      </div>

      <div className="text-center mt-5 w-full">
        <ChartWrapper title="Patient Status" data={"3"}>
          <PatientStatus />
        </ChartWrapper>
      </div>
    </div>
  );
};

export default DoctorDashboard;
