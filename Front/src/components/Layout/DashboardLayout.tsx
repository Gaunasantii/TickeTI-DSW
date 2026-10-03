import React from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 flex">
      <Sidebar />
      <main className="ml-64 flex-1 h-screen overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;