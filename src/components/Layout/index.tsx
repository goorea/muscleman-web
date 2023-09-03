import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import {
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Paper,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import UserMenu from '@src/components/UserMenu';

import { AppBar, Drawer } from './styled';

const Layout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const { pathname } = useLocation();
  const title = useMemo(() => {
    switch (pathname) {
      case '/trainings':
        return '운동종목';
      default:
        return '';
    }
  }, [pathname]);

  const toggleDrawer = () => setOpen(prevOpen => !prevOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ pr: '24px' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            {title}
          </Typography>

          <UserMenu />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton
            to="/trainings"
            component={Link}
            selected={pathname === '/trainings'}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="운동종목" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />

        <Container maxWidth={false} sx={{ my: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
