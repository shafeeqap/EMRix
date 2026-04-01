import React from "react";
import { useSelector } from "react-redux";
import { Bell, Settings, UserRound } from "lucide-react";
import { getFullName, getUserRole } from "../../../utils/userHelpers";
import IconButton from "./IconButton";

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);

  const fullName = getFullName(user);
  const roleLabel = getUserRole(user.role);

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="font-semibold text-lg">Dashboard</h1>

      <div className="flex gap-2 items-center ">
        <IconButton>
          <Settings size={30} />
        </IconButton>

        <IconButton>
          <Bell size={30} />
        </IconButton>

        <div className="hidden sm:block">
          <p className="font-semibold">{fullName}</p>
          <p className="text-textPrimary">
            <small>{roleLabel}</small>
          </p>
        </div>

        <IconButton>
          <UserRound size={30} />
        </IconButton>
      </div>
    </div>
  );
};

export default Topbar;
