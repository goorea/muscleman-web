import { PaletteOptions } from '@mui/material/styles/createPalette';
import useMediaQuery from '@mui/material/useMediaQuery';

const usePalette = (): PaletteOptions => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return {
    mode: prefersDarkMode ? 'dark' : 'light',
  };
};

export default usePalette;
