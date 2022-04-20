import { PaletteOptions } from '@mui/material/styles/createPalette';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  };
};

export default usePalette;
