import React from "react";
import SuperAdminDashboard from "../features/dashboard/SuperAdminDashboard";
import DoctorDashboard from "../features/dashboard/DoctorDashboard";
import ReceptionistDashboard from "../features/dashboard/ReceptionistDashboard";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  console.log("user in dashboard:", user);

  if (!user) {
    return (
      <div className="p-6">
        <Loader />
      </div>
    );
  }

  switch (user.role) {
    case "super_admin":
      return <SuperAdminDashboard />;
    case "doctor":
      return <DoctorDashboard />;
    case "receptionist":
      return <ReceptionistDashboard />;
    default:
      return <div className="p-6">Unauthorized</div>;
  }
};

export default Dashboard;
