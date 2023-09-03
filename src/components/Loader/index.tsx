import { CircularProgress, Container } from '@mui/material';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <Container
      data-testid="loader"
      component="main"
      disableGutters={true}
      maxWidth={false}
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        zIndex: theme => theme.zIndex.snackbar,
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default Loader;
