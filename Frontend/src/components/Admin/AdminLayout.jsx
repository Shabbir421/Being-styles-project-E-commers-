/** @format */

import React, { useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Toggle Button */}
      <div className="flex md:hidden p-4 bg-gray-900 z-20 justify-between">
        <button onClick={toggleSidebar} className="flex items-center">
          <FaBars size={24} className="text-white" />
          <h1 className="ml-4 text-xl font-medium text-white">
            Admin Dashboard
          </h1>
        </button>
        {/* User Button to close sidebar */}
        <button onClick={closeSidebar} className="text-white">
          <FaUser size={24} />
        </button>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-10"
          onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 min-h-screen bg-gray-900 text-white transform ${
          isSidebarOpen ? "translate-x-0 h-full" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 md:w-64 z-10`}>
        <div className="p-4 text-white">
          <h2 className="text-xl font-semibold text-white">Admin Sidebar</h2>
        </div>
        {/* Admin Sidebar Component */}
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-grow p-4 overflow-auto md:p-0">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
