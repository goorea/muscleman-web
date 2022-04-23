import {
  PaletteColor,
  PaletteColorOptions,
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material';

declare module '@mui/material' {
  interface Palette extends MuiPalette {
    kakao: PaletteColor;
    naver: PaletteColor;
    google: PaletteColor;
    facebook: PaletteColor;
    apple: PaletteColor;
  }

  interface PaletteOptions extends MuiPaletteOptions {
    kakao: PaletteColorOptions;
    naver: PaletteColorOptions;
    google: PaletteColorOptions;
    facebook: PaletteColorOptions;
    apple: PaletteColorOptions;
  }
}
