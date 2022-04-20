import Container from '@mui/material/Container';
import React from 'react';

type P = unknown;

const NotFoundScreen: React.FC<P> = () => {
  return (
    <Container component="main" maxWidth="xs">
      Not Found Screen
    </Container>
  );
};

export default NotFoundScreen;
