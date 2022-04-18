import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

import ThemeProvider from '@src/contexts/ThemeProvider';

import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CssBaseline />

      <div className="App">
        <Button color="primary" variant="contained">
          primary
        </Button>
        <Button color="secondary" variant="contained">
          secondary
        </Button>
        <Button color="success" variant="contained">
          success
        </Button>
        <Button color="error" variant="contained">
          error
        </Button>
        <Button color="info" variant="contained">
          info
        </Button>
        <Button color="warning" variant="contained">
          warning
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default App;
