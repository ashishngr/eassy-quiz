import React from 'react'
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DashboardLayout = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
        <div className="flex h-screen">
        {/* Sidebar */}
          <SideBar />
        {/* Main content */}
        <main className="flex-grow px-6 pt-4 overflow-y-auto">
            {/* Outlet for nested routes */}
            <Outlet />
        </main>
      </div>
    </Box>
    
  )
}
export default DashboardLayout; 


