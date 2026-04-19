import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, Box, ListItemButton } from '@mui/material';
import { Dashboard, ListAlt, AddCircle, Settings, Category } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, onDrawerClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useSettings();

  const menuItems = [
    { text: t.dashboard, icon: <Dashboard />, path: '/dashboard' },
    { text: t.allGoals, icon: <ListAlt />, path: '/goals' },
    { text: t.newGoal, icon: <AddCircle />, path: '/goals/new' },
    { text: t.categories, icon: <Category />, path: '/categories' },
    { text: t.settings, icon: <Settings />, path: '/settings' },
  ];

  const drawerContent = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              onClick={() => { navigate(item.path); onDrawerClose(); }}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': { backgroundColor: 'primary.light', color: 'primary.main' },
                my: 0.5, mx: 1, borderRadius: 2
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;