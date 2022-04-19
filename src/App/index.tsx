import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '@src/components/Routes';
import ThemeProvider from '@src/contexts/ThemeProvider';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
