import { ComponentsOverrides } from '@mui/material';
import React from 'react';

import SpoqaHanSansNeoBold from '@src/assets/fonts/SpoqaHanSansNeo-Bold.ttf';
import SpoqaHanSansNeo from '@src/assets/fonts/SpoqaHanSansNeo-Regular.ttf';
import SpoqaHanSansNeoThin from '@src/assets/fonts/SpoqaHanSansNeo-Thin.ttf';

const useFonts = (): {
  fontFamily: React.CSSProperties['fontFamily'];
  styleOverrides: ComponentsOverrides['MuiCssBaseline'];
} => ({
  fontFamily: [
    'SpoqaHanSansNeo',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  styleOverrides: `
    @font-face {
      font-family: 'SpoqaHanSansNeo';
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: local('SpoqaHanSansNeo'), local('SpoqaHanSansNeo-Regular'), url(${SpoqaHanSansNeo}) format('truetype');
    }
    @font-face {
      font-family: 'SpoqaHanSansNeo';
      font-style: normal;
      font-display: swap;
      font-weight: 700;
      src: local('SpoqaHanSansNeoBold'), local('SpoqaHanSansNeo-Bold'), url(${SpoqaHanSansNeoBold}) format('truetype');
    }
    @font-face {
      font-family: 'SpoqaHanSansNeo';
      font-style: normal;
      font-display: swap;
      font-weight: 300;
      src: local('SpoqaHanSansNeoThin'), local('SpoqaHanSansNeo-Thin'), url(${SpoqaHanSansNeoThin}) format('truetype');
    }
  `,
});

export default useFonts;
