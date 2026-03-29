import React from "react";
const SuperAdminDashboard = React.lazy(() =>
  import("../features/dashboard/SuperAdminDashboard")
);
const DoctorDashboard = React.lazy(() =>
  import("../features/dashboard/DoctorDashboard")
);
const ReceptionistDashboard = React.lazy(() =>
  import("../features/dashboard/ReceptionistDashboard")
);
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import DashboardLayout from "../layouts/DashboardLayout";

const roleMap = {
  super_admin: SuperAdminDashboard,
  doctor: DoctorDashboard,
  receptionist: ReceptionistDashboard,
};

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

  const RoleComponent = roleMap[user?.role];

  if (!RoleComponent) {
    return <div className="p-6">Unauthorized</div>;
  }

  return (
    <DashboardLayout>
      <RoleComponent />
    </DashboardLayout>
  );
};

export default Dashboard;
