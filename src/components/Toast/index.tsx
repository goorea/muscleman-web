import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material/Alert/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react';

export type ToastProps = {
  message: string;
  severity: AlertColor;
};

const Toast: React.FC<ToastProps> = ({ severity, message }) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={severity} sx={{ width: '100%' }} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
