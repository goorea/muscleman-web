import { Container, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import gym from '@src/assets/images/gym.jpg';

export const BackgroundContainer = styled('div')({
  width: '100vw',
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
    zIndex: '-1',
    opacity: '0.5',
  },
});

export const HomeContainer = styled(Container)(({ theme }) => ({
  paddingTop: '48px',
  color: theme.palette.common.black,
  textAlign: 'center',
  opacity: 1,
}));

export const DownloadLink = styled(Link)`
  display: block;
`;

export const MainDescription = styled(Typography)({
  lineHeight: '1.5',
  fontWeight: '700',
});
