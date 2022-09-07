import {
  Typography,
  Container,
  Toolbar,
  useScrollTrigger,
  AppBar,
} from '@mui/material';
import React from 'react';

import { IconLink } from './styled';

const Header: React.FC = () => {
  const trigger = useScrollTrigger({
    threshold: 1,
  });

  return (
    <AppBar
      color="inherit"
      sx={{
        boxShadow: trigger ? 1 : 0,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconLink href="/" color="inherit" title="근육맨" underline="none">
            <img
              src={process.env.PUBLIC_URL + '/transparent-logo192.png'}
              alt="로고"
              width={30}
              height={30}
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              근육맨
            </Typography>
          </IconLink>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
