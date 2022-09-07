import { styled } from '@mui/material/styles';

import gym from '@src/assets/images/gym.jpg';

export const BackgroundContainer = styled('div')({
  height: '100vh',
  position: 'relative',
  '&::after': {
    width: '100%',
    height: '100%',
    content: '""',
    backgroundImage: `url(${gym})`,
    backgroundSize: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
});
