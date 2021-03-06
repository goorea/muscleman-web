import { Alert, Snackbar } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';
import React from 'react';

import useSnackbar from './hooks/useSnackbar';

export type ToastProps = {
  message: string;
  severity: AlertColor;
};

const Toast: React.FC<ToastProps & { index: number }> = ({
  index,
  message,
  severity,
}) => {
  const { open, handleClose, handleExited } = useSnackbar(index);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      TransitionProps={{ onExited: handleExited }}
    >
      <Alert severity={severity} sx={{ width: '100%' }} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
