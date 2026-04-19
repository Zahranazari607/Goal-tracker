import React from 'react';
import { Box, Typography, Grid, Paper, LinearProgress, Divider } from '@mui/material';
import { useGoals } from '../context/GoalContext';
import { useSettings } from '../context/SettingsContext';

const Categories = () => {
  const { goals } = useGoals();
  const { t } = useSettings();
  

  const categories = ['Study', 'Health', 'Work', 'Personal'];

  const getStats = (cat) => {
    const catGoals = goals.filter(g => g.category === cat);

    const completed = catGoals.filter(g => g.progress >= g.target && g.target > 0).length;
    return { count: catGoals.length, completed };
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        {t.categories}
      </Typography>

      <Grid container spacing={3}>
        {categories.map(cat => {
          const stats = getStats(cat);
          const progress = stats.count > 0 ? (stats.completed / stats.count) * 100 : 0;

          return (
            <Grid item xs={12} sm={6} md={3} key={cat}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  borderRadius: 4, 
                  textAlign: 'center',
                  transition: '0.3s',
                  '&:hover': { boxShadow: 6 } 
                }}
              >

                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  {cat}
                </Typography>
                
                <Divider sx={{ my: 1.5 }} />

                <Typography variant="body2" color="textSecondary" mb={1}>
                  {stats.completed} {t.completed} / {stats.count}
                </Typography>

                <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%', alignItems: 'center', flexDirection: 'column' }}>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                    {Math.round(progress)}%
                  </Typography>
                  
                  <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{ 
                      height: 10, 
                      borderRadius: 5, 
                      width: '100%',
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        backgroundColor: progress === 100 ? '#4caf50' : '#6366f1'
                      }
                    }} 
                  />
                </Box>
                
                <Typography variant="caption" display="block" sx={{ mt: 1.5, color: 'text.disabled' }}>
                   {stats.count > 0 ? `${t.activeGoals}: ${stats.count - stats.completed}` : t.noGoals}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          {t.history} ({t.categories})
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          {categories.map(cat => {
            const stats = getStats(cat);
            const progress = stats.count > 0 ? (stats.completed / stats.count) * 100 : 0;
            return (
              <Box key={`list-${cat}`} sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                  <Typography variant="body1" fontWeight="medium">{cat}</Typography>
                  <Typography variant="body2">{Math.round(progress)}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3 }} />
              </Box>
            );
          })}
        </Paper>
      </Box>
    </Box>
  );
};

export default Categories;