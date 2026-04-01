import React, { useEffect, useState } from "react";
import StatusCard from "../components/StatusCard";
import ProfileCard from "../components/ProfileCard";
import { statusCardItems } from "./config/superAdmin.config";
import { useSelector } from "react-redux";
import { getFullName } from "../../../utils/userHelpers";
import ChartWrapper from "../components/ChartWrapper";
import AppointmentTrends from "./charts/AppointmentTrends";
import RevenueOverview from "./charts/RevenueOverview";


const SuperAdminDashboard = () => {
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 5900,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    // {
    //   name: "Jul",
    //   uv: 6490,
    //   pv: 5300,
    //   amt: 2100,
    // },
    // {
    //   name: "Aug",
    //   uv: 3370,
    //   pv: 4390,
    //   amt: 2400,
    // },
    // {
    //   name: "Sep",
    //   uv: 3490,
    //   pv: 8300,
    //   amt: 2100,
    // },
    // {
    //   name: "Oct",
    //   uv: 5490,
    //   pv: 7300,
    //   amt: 2100,
    // },
    // {
    //   name: "Nov",
    //   uv: 7490,
    //   pv: 4300,
    //   amt: 2100,
    // },
    // {
    //   name: "Dec",
    //   uv: 3200,
    //   pv: 4370,
    //   amt: 2190,
    // },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const fullName = getFullName(user);

  useEffect(() => {
    // Simulate data fetching
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
      <ProfileCard fullName={fullName} />
      <StatusCard statusCardItems={statusCardItems} />

      <div className="text-center mt-5 w-full">
        <ChartWrapper
          title="Appointment Trends"
          data={data}
          isLoading={isLoading}
        >
          <AppointmentTrends data={data} />
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
