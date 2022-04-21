import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import client from '@src/client';
import Routes from '@src/components/Routes';
import Toasts from '@src/components/Toasts';
import ThemeProvider from '@src/contexts/ThemeProvider';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <RecoilRoot>
          <ApolloProvider client={client}>
            <CssBaseline />
            <Routes />
            <Toasts />
          </ApolloProvider>
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
