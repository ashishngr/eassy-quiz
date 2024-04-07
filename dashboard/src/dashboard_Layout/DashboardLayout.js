import React from 'react'

import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <div className="flex-1 px-6 pt-4">
        {/* Outlet for nested routes */}
        <Outlet />
      </div>
    </div>
  )
}
export default DashboardLayout; 


