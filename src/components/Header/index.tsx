import { Typography } from '@mui/material';
import React from 'react';

import { StyledHeader, HeaderWrapper, IconLink } from './styled';

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <HeaderWrapper>
        <IconLink href="/" color="inherit" title="근육맨" underline="none">
          <img
            src={process.env.PUBLIC_URL + '/transparent-logo192.png'}
            alt="로고"
            width={30}
            height={30}
          />
          <Typography variant="subtitle2">근육맨</Typography>
        </IconLink>
      </HeaderWrapper>
    </StyledHeader>
  );
};

export default Header;
