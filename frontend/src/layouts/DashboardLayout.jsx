import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../features/dashboard/components/Sidebar";
import Topbar from "../features/dashboard/components/Topbar";

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
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
