import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Avatar, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSettings } from '../context/SettingsContext';

const Navbar = ({ onMenuClick, user, onLogout }) => {
  const settings = useSettings();
  
  if (!settings) {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Goal Tracker</Typography>
        </Toolbar>
      </AppBar>
    );
  }

  const { lang, setLang, mode, setMode } = settings;

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          Goal Tracker Pro
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* بخش اطلاعات کاربر - جدید */}
          {user && (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: 2 }}>
              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
                {user.name}
              </Typography>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '0.9rem' }}>
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </Avatar>
              <IconButton color="inherit" onClick={onLogout} title="Logout">
                <LogoutIcon />
              </IconButton>
            </Stack>
          )}

          <Button 
            color="inherit" 
            onClick={() => setLang(lang === 'en' ? 'fa' : 'en')} 
            startIcon={<LanguageIcon />}
          >
            {lang === 'en' ? 'FA' : 'EN'}
          </Button>

          <IconButton color="inherit" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;