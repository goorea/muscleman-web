import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import client from '@src/client';
import Routes from '@src/components/Routes';
import ThemeProvider from '@src/contexts/ThemeProvider';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ApolloProvider client={client}>
          <CssBaseline />
          <Routes />
        </ApolloProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
