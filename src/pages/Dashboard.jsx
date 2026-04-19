import React, { useState } from 'react';
import { Grid, Typography, Box, Paper, Button } from '@mui/material';
import { Add, TrendingUp, EmojiEvents, DateRange } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useGoals } from '../context/GoalContext';
import { useSettings } from '../context/SettingsContext';
import GoalCard from '../components/GoalCard';
import ConfirmDialog from '../components/ConfirmDialog';

const Dashboard = () => {
  const { goals, stats, updateProgress, deleteGoal, toggleStatus } = useGoals();
  const { t } = useSettings();
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const activeGoals = goals.filter(g => g.progress < g.target).slice(0, 4);

  const handleDeleteClick = (id) => {
    setSelectedGoalId(id);
    setOpenDelete(true);
  };

  const handleConfirmDelete = () => {
    if (selectedGoalId) {
      deleteGoal(selectedGoalId);
      setOpenDelete(false);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">{t.dashboard}</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/goals/new')}>
          {t.newGoal}
        </Button>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <SummaryCard title={t.totalXp} value={stats.xp} icon={<EmojiEvents sx={{ color: '#f59e0b' }} />} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SummaryCard title={t.streak} value={`${stats.streak} ${t.days}`} icon={<TrendingUp sx={{ color: '#ef4444' }} />} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SummaryCard title={t.completed} value={stats.completedCount} icon={<DateRange sx={{ color: '#10b981' }} />} />
        </Grid>
      </Grid>

      <Typography variant="h6" mb={2}>{t.activeGoals}</Typography>
      <Grid container spacing={2}>
        {activeGoals.map(goal => (
          <Grid item xs={12} md={6} key={goal.id}>
            <GoalCard 
              goal={goal} 
              onUpdate={updateProgress}
              onDelete={() => handleDeleteClick(goal.id)} 
              onToggleStatus={toggleStatus} 
              onEdit={(id) => navigate(`/goals/${id}`)} 
            />
          </Grid>
        ))}
      </Grid>

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

const SummaryCard = ({ title, value, icon }) => (
  <Paper sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'action.hover' }}>{icon}</Box>
    <Box>
      <Typography color="textSecondary" variant="body2">{title}</Typography>
      <Typography variant="h5" fontWeight="bold">{value}</Typography>
    </Box>
  </Paper>
);

export default Dashboard;