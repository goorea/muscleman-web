import { CircularProgress, Container } from '@mui/material';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <Container
      component="main"
      disableGutters={true}
      maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default Loader;
