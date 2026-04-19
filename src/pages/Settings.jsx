import React from 'react';
import { Box, Typography, Paper, Switch, FormControlLabel, Select, MenuItem, Divider } from '@mui/material';
import { useSettings } from '../context/SettingsContext';

const Settings = () => {
  const { lang, setLang, mode, setMode, t } = useSettings();

  return (
    <Box maxWidth={600}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        {t.settings}
      </Typography>
      
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography>{t.language}</Typography>
          <Select size="small" value={lang} onChange={(e) => setLang(e.target.value)}>
            <MenuItem value="en">English (LTR)</MenuItem>
            <MenuItem value="fa">فارسی (RTL)</MenuItem>
          </Select>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <FormControlLabel
          control={
            <Switch 
              checked={mode === 'dark'} 
              onChange={() => setMode(mode === 'light' ? 'dark' : 'light')} 
            />
          }
          label={mode === 'dark' ? t.dark : t.light}
        />
        <Typography variant="caption" display="block" color="textSecondary" sx={{ mt: 1 }}>
          {t.theme}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Settings;