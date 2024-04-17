import React from 'react'

import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

     {/* Main content */}
     <main className="flex-grow px-6 pt-4 overflow-y-auto">
        {/* Outlet for nested routes */}
        <Outlet />
      </main>
    </div>
  )
}
export default DashboardLayout; 


