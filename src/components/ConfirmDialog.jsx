import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useSettings } from '../context/SettingsContext';

const ConfirmDialog = ({ open, onClose, onConfirm, title, message }) => {
  const { t } = useSettings();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || t.delete}</DialogTitle>
      <DialogContent>
        <Typography>{message || t.confirmDelete}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t.cancel}</Button>
        <Button onClick={onConfirm} color="error" variant="contained">{t.delete}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;