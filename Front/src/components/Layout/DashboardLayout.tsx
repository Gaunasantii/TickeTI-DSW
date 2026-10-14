import React from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router";


export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 lg:flex lg:h-screen lg:overflow-hidden">
      <Sidebar />
      <main className="min-h-screen w-full flex-1 overflow-y-auto px-4 pt-20 pb-4 sm:px-5 sm:pt-20 sm:pb-5 md:px-6 md:pb-6 lg:ml-64 lg:h-screen lg:p-8 lg:pt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;