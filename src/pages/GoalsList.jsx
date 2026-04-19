import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Tabs, Tab, TextField, MenuItem, Select, 
  FormControl, InputLabel, InputAdornment, Button, Divider, Avatar, Stack 
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Download as DownloadIcon, 
  EmojiEvents as TrophyIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useGoals } from '../context/GoalContext';
import { useSettings } from '../context/SettingsContext';
import GoalCard from '../components/GoalCard';
import ConfirmDialog from '../components/ConfirmDialog';

const GoalsList = () => {
  const { goals, updateProgress, deleteGoal, toggleStatus } = useGoals();
  const { t } = useSettings();
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const [user, setUser] = useState({ name: "User", isLoggedIn: true });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleExport = () => {
    const dataStr = JSON.stringify(goals, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'my-goals.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleOpenDelete = (id) => {
    setSelectedGoalId(id);
    setOpenDelete(true);
  };

  const handleConfirmDelete = () => {
    if (selectedGoalId) {
      deleteGoal(selectedGoalId);
      setOpenDelete(false);
    }
  };

  const filteredAndSortedGoals = goals
    .filter(g => {
      const query = searchQuery.toLowerCase().trim();
      const matchesTab = query !== '' ? true : (tabValue === 0 ? g.progress < g.target : g.progress >= g.target);
      
      const progressPercent = Math.round((g.progress / g.target) * 100).toString();
      const matchesSearch = 
        (g.title || "").toLowerCase().includes(query) ||
        (g.category || "").toLowerCase().includes(query) || 
        progressPercent.includes(query);

      return matchesTab && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'progress') return ((b.progress / b.target) || 0) - ((a.progress / a.target) || 0);
      if (sortBy === 'category') return (a.category || "").localeCompare(b.category || "");
      return Number(b.id) - Number(a.id);
    });

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center" gap={2}>
          {/* نمایش حرف اول نام واقعی */}
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {user.name ? user.name[0].toUpperCase() : 'U'}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">{t.allGoals}</Typography>
            <Typography variant="body2" color="textSecondary">
              Welcome back, <strong>{user.name}</strong>!
            </Typography>
          </Box>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button startIcon={<DownloadIcon />} variant="outlined" onClick={handleExport}>Export JSON</Button>
        </Stack>
      </Stack>

      <Grid container spacing={2} mb={3} alignItems="center">
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            placeholder="Search by title, category or progress %..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="progress">Progress %</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
        <Tab label={t.activeGoals?.toUpperCase() || "ACTIVE"} />
        <Tab label={t.completed?.toUpperCase() || "COMPLETED"} />
      </Tabs>

      <Grid container spacing={2}>
        {filteredAndSortedGoals.length > 0 ? (
          filteredAndSortedGoals.map(goal => (
            <Grid item xs={12} md={6} key={goal.id}>
              <GoalCard 
                goal={goal} 
                onUpdate={updateProgress}
                onDelete={() => handleOpenDelete(goal.id)}
                onToggleStatus={toggleStatus} 
                onEdit={(id) => navigate(`/goals/${id}`)} 
              />
            </Grid>
          ))
        ) : (
          <Box sx={{ width: '100%', textAlign: 'center', py: 5 }}>
            <Typography color="textSecondary">
              {searchQuery ? `No results found for "${searchQuery}"` : t.noGoals}
            </Typography>
          </Box>
        )}
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

export default GoalsList;