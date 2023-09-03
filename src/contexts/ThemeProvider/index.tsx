import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import React from 'react';

import useFonts from './hooks/useFonts';
import usePalette from './hooks/usePalette';

type P = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<P> = ({ children }) => {
  const palette = usePalette();
  const { fontFamily, styleOverrides } = useFonts();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette,
        typography: {
          fontFamily,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides,
          },
        },
      }),
    [fontFamily, palette, styleOverrides],
  );

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
