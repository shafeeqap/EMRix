import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white shadow p-4 flex justify-between">
      {/* Hamburger (mobile only) */}
      {/* <button className="md:hidden" onClick={() => setIsOpen((prev) => !prev)}>
        <Menu size={24} />
      </button> */}

      <h1 className="font-semibold text-lg">Dashboard</h1>
      
      <div className="text-sm text-gray-600">{user?.name}</div>

      <div className="text-sm text-gray-600">
        {user?.name}{" "}
        {user?.role === "super_admin"
          ? "(Super Admin)"
          : user?.role === "doctor"
          ? "(Doctor)"
          : user?.role === "receptionist"
          ? "(Receptionist)"
          : ""}
      </div>
    </div>
  );
};

export default Topbar;
