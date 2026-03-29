import React from "react";
import { useSelector } from "react-redux";
import { Bell, Settings, UserRound } from "lucide-react";

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="font-semibold text-lg">Dashboard</h1>

      <div className="flex gap-2 items-center ">
        <div className="flex justify-center items-center rounded-md border w-12 h-12 cursor-pointer hover:bg-slate-100 duration-300">
        <Settings size={30} />
        </div>
        <div className="flex justify-center items-center rounded-md border w-12 h-12 cursor-pointer hover:bg-slate-100 duration-300">
        <Bell size={30} />
        </div>

        <div className="hidden sm:block">
          <p className="font-semibold">
            {user?.firstName} {user?.lastName}
          </p>
          {user.role === "super_admin" ? (
            <small>Super Admin</small>
          ) : user.role === "doctor" ? (
            <small>Doctor</small>
          ) : user.role === "receptionist" ? (
            <small>Receptionist</small>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-center items-center rounded-md border w-12 h-12 cursor-pointer hover:bg-slate-100 duration-300">
          <UserRound size={30} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
