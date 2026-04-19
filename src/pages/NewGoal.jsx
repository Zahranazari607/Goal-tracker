import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Grid, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGoals } from '../context/GoalContext';
import { useSettings } from '../context/SettingsContext';

const NewGoal = () => {
  const { id } = useParams();
  const { goals, addGoal, editGoal } = useGoals();
  const { t } = useSettings();
  const navigate = useNavigate();

  const [form, setForm] = useState({ 
    title: '', 
    category: 'Study', 
    type: 'daily', 
    target: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });

  useEffect(() => {
    if (id) {
      const existingGoal = goals.find(g => g.id === id || g.id === Number(id));
      if (existingGoal) setForm(existingGoal);
    }
  }, [id, goals]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.target) return;

    if (id) {
      editGoal(id, form); 
    } else {
      addGoal(form); 
    }
    navigate('/goals');
  };

  return (
    <Box maxWidth={600} mx="auto">
      <Typography variant="h4" mb={3} fontWeight="bold">
        {id ? t.edit : t.newGoal}
      </Typography>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="Title" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                {['Study', 'Health', 'Work', 'Personal'].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Type" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="count">Count-based</MenuItem>
                <MenuItem value="time">Time-based</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="date" label="Start Date" InputLabelProps={{ shrink: true }} value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="date" label="End Date (Optional)" InputLabelProps={{ shrink: true }} value={form.endDate || ''} onChange={e => setForm({...form, endDate: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type="number" label="Target" required value={form.target} onChange={e => setForm({...form, target: Number(e.target.value)})} />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth size="large" variant="contained" type="submit">
                {id ? t.save : t.newGoal}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default NewGoal;