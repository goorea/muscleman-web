import ButtonGroup from '@mui/material/ButtonGroup';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import { darken } from 'polished';

export const SocialButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  '& > *:not(:last-child)': {
    marginRight: theme.spacing(2),
  },
}));

export const SocialFab = styled(Fab)<{
  social: 'google' | 'apple' | 'naver' | 'kakao';
}>(({ theme, social }) => ({
  backgroundColor:
    theme.palette[social][
      social === 'apple' && theme.palette.mode === 'dark' ? 'dark' : 'main'
    ],
  '&:hover': {
    backgroundColor: darken(
      0.2,
      theme.palette[social][
        social === 'apple' && theme.palette.mode === 'dark' ? 'dark' : 'main'
      ],
    ),
  },
}));
