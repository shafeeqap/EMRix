import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { sidebarOpen } = useSelector((state) => state.layout);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    setShowContent(false);

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500); // match transition duration

    return () => clearTimeout(timer);
  }, [sidebarOpen]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside>
        {" "}
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen min-w-0">
        <Topbar />
        <div className="p-6">{showContent && <Outlet />}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
