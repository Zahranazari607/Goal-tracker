import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children, user }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    window.location.reload(); 
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar 
        onMenuClick={handleDrawerToggle} 
        user={user} 
        onLogout={handleLogout} 
      />
      
      <Sidebar mobileOpen={mobileOpen} onDrawerClose={handleDrawerToggle} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          minHeight: '100vh',
          backgroundColor: (theme) => theme.palette.mode === 'light' ? '#f5f5f5' : '#121212'
        }}
      >
        <Toolbar /> 
        {children}
      </Box>
    </Box>
  );
};

export default Layout;