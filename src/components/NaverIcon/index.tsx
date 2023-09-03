import { common } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import React from 'react';

type P = {
  size?: number;
  fill?: boolean;
};

const NaverIcon: React.FC<P> = ({ size = 16, fill = false }) => {
  const theme = useTheme();

  return (
    <svg width={size} height={size * 0.9142857143} viewBox="0 0 28 25.6">
      <polygon
        fill={fill ? theme.palette.naver.main : common.white}
        points="18.5,0 18.5,12.9 9.6,0 0,0 0,25.7 9.6,25.7 9.6,12.7 18.4,25.7 28,25.7 28,0 "
      />
    </svg>
  );
};

export default NaverIcon;
