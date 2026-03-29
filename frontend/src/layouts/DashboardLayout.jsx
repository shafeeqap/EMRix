import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside>
        {" "}
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 min-h-screen">
        <Topbar />
        {/* <div className="p-6">{children}</div> */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
