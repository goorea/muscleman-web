import { Person as PersonIcon } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import useLogout from '@src/hooks/useLogout';
import { userSelector } from '@src/recoils';

const UserMenu: React.FC = () => {
  const user = useRecoilValue(userSelector);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const logout = useLogout();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="user-button"
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
        variant="outlined"
        startIcon={<PersonIcon />}
      >
        {user?.name}
      </Button>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-button',
        }}
      >
        <MenuItem onClick={logout}>로그아웃</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
