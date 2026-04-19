import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Button, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';
import { ArrowBack, CheckCircle, Edit, Delete, CalendarMonth, Flag } from '@mui/icons-material';
import { useGoals } from '../context/GoalContext';
import { useSettings } from '../context/SettingsContext';
import ConfirmDialog from '../components/ConfirmDialog';

const GoalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useSettings();
  const { goals, updateProgress, deleteGoal } = useGoals();
  const [openDelete, setOpenDelete] = useState(false);

  const goal = goals.find(g => g.id === id || g.id === Number(id));

  if (!goal) return <Typography p={5}>{t.noGoals}</Typography>;

  const progressPercent = Math.min((goal.progress / goal.target) * 100, 100);

  const handleConfirmDelete = () => {
    deleteGoal(goal.id);
    setOpenDelete(false);
    navigate('/dashboard');
  };

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        {t.back}
      </Button>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h4" fontWeight="bold">{goal.title}</Typography>
              <Chip 
                label={goal.status.toUpperCase()} 
                color={goal.status === 'active' ? 'primary' : goal.status === 'completed' ? 'success' : 'default'} 
                variant="outlined" 
              />
            </Box>

            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {goal.category} | {goal.type}
            </Typography>

            <Box display="flex" gap={3} my={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <CalendarMonth fontSize="small" color="action" />
                <Typography variant="body2"><b>Start:</b> {goal.startDate || 'Not set'}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Flag fontSize="small" color="action" />
                <Typography variant="body2"><b>End:</b> {goal.endDate || 'No deadline'}</Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />

            <Box my={4}>
              <Typography variant="h6">{Math.round(progressPercent)}% Completed</Typography>
              <Box sx={{ width: '100%', height: 12, bgcolor: '#eee', borderRadius: 5, mt: 1, overflow: 'hidden' }}>
                <Box sx={{ width: `${progressPercent}%`, height: '100%', bgcolor: 'primary.main', transition: '0.3s' }} />
              </Box>
              <Typography variant="caption" color="textSecondary">
                Current: {goal.progress} / Target: {goal.target}
              </Typography>
            </Box>

            <Typography variant="h6" mt={4}>{t.history}</Typography>
            <Divider sx={{ my: 1 }} />
            <List>
              {goal.logs && goal.logs.length > 0 ? (
                [...goal.logs].reverse().map((log, index) => (
                  <ListItem key={index} divider>
                    <ListItemText 
                      primary={new Date(log.date).toLocaleString()}
                      secondary={`Progress updated: +${log.amount || 1}`} 
                    />
                  </ListItem>
                ))
              ) : (
                <Typography color="textSecondary" py={2}>{t.noGoals}</Typography>
              )}
            </List>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover', borderRadius: 2 }}>
              <Typography variant="h6" mb={2}>Actions</Typography>
              <Button 
                fullWidth 
                variant="contained" 
                color="success" 
                startIcon={<CheckCircle />} 
                onClick={() => updateProgress(goal.id)} 
                sx={{ mb: 2 }} 
                disabled={goal.status !== 'active' || goal.progress >= goal.target}
              >
                {t.logProgress}
              </Button>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<Edit />} 
                onClick={() => navigate(`/goals/${goal.id}/edit`)} 
                sx={{ mb: 2 }}
              >
                {t.edit}
              </Button>
              <Button 
                fullWidth 
                variant="outlined" 
                color="error" 
                startIcon={<Delete />}
                onClick={(e) => { e.currentTarget.blur(); setOpenDelete(true); }}
              >
                {t.delete}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <ConfirmDialog 
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
        title={t.delete}
        message={t.confirmDelete}
      />
    </Box>
  );
};

export default GoalDetails;