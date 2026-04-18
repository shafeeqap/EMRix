import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Sidebar */}
      <aside>
        {" "}
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="min-h-screen w-full bg-gray-100">
        <Topbar />
        <div className="p-6 pl-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
