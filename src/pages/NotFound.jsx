import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useSettings } from '../context/SettingsContext';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useSettings();

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', textAlign: 'center' }}>
        <Typography variant="h1" fontWeight="bold" color="primary" sx={{ fontSize: '8rem' }}>404</Typography>
        <Typography variant="h4" mb={2}>Page Not Found</Typography>
        <Button variant="contained" size="large" startIcon={<HomeIcon />} onClick={() => navigate('/')}>
          {t.back}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;