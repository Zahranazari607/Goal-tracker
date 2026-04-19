import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box, IconButton, Chip } from '@mui/material';
import { CheckCircle, Edit, Pause, PlayArrow, Delete } from '@mui/icons-material';

const GoalCard = ({ goal, onUpdate, onDelete, onEdit, onToggleStatus }) => {
  const progressPercent = Math.min((goal.progress / goal.target) * 100, 100);
  const isActive = goal.status === 'active';
  const isCompleted = goal.progress >= goal.target;

  return (
    <Card sx={{ borderRadius: 4, mb: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="h6" fontWeight="bold">{goal.title}</Typography>
          <Chip label={goal.category || 'Goal'} size="small" color="primary" variant="outlined" />
        </Box>

        <Typography variant="body2" color="textSecondary" mb={1}>
          {goal.progress} / {goal.target} units ({Math.round(progressPercent)}%)
        </Typography>

        <LinearProgress 
          variant="determinate" 
          value={progressPercent} 
          sx={{ height: 8, borderRadius: 5, mb: 3 }} 
        />

        <Box display="flex" justifyContent="space-between">
          <Box>
            <IconButton 
              color="success" 
              onClick={() => onUpdate(goal.id)} 
              disabled={!isActive || isCompleted}
            >
              <CheckCircle />
            </IconButton>
            
            <IconButton 
              color="primary" 
              onClick={() => onToggleStatus(goal.id)}
            >
              {isActive ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Box>

          <Box>
            <IconButton 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(goal.id);
              }}
            >
              <Edit />
            </IconButton>
            
            <IconButton 
              color="error" 
              onClick={(e) => {
                e.currentTarget.blur();
                onDelete(goal.id);
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GoalCard;