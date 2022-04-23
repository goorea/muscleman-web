import { Button, Container, Typography } from '@mui/material';
import React from 'react';

const NotFoundScreen: React.FC = () => (
  <Container
    data-testid="notFoundScreen"
    component="main"
    disableGutters={true}
    maxWidth={false}
    sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <Typography
      variant="h1"
      gutterBottom={false}
      sx={{ color: 'primary.main', fontWeight: 'bold' }}
    >
      404
    </Typography>
    <Typography variant="h5">이런! 페이지를 찾을 수 없습니다.</Typography>
    <Typography paragraph={true} align="center" mt={2}>
      죄송합니다. 찾으시는 페이지가 없습니다.
      <br />
      만약 무언가가 고장났다고 생각되신다면 문의해주세요!
    </Typography>
    <Button variant="contained" href="mailto:goorea1026@gmail.com">
      문의하기
    </Button>
  </Container>
);

export default NotFoundScreen;
