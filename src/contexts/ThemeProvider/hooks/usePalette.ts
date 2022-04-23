import { useMediaQuery } from '@mui/material';
import { PaletteOptions } from '@mui/material/styles';

const usePalette = (): PaletteOptions => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return {
    mode: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: '#2687ED',
    },
    secondary: {
      main: '#ca71eb',
    },
    success: {
      main: '#52c41a',
    },
    error: {
      main: '#ff190c',
    },
    warning: {
      main: '#faad14',
    },
    kakao: {
      main: '#fee500',
    },
    naver: {
      main: '#1ec800',
    },
    google: {
      main: '#e1e8ee',
    },
    facebook: {
      main: '#3b5999',
    },
    apple: {
      main: '#000',
      dark: '#fff',
    },
  };
};

export default usePalette;
