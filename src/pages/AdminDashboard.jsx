import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/core/Admin/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 w-full">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between w-full px-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Panel
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-sm">Admin</span>
            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto w-full">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminDashboard;
