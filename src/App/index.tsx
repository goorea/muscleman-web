import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@mui/material';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import client from '@src/client';
import Loader from '@src/components/Loader';
import Routes from '@src/components/Routes';
import Toasts from '@src/components/Toasts';
import ThemeProvider from '@src/contexts/ThemeProvider';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <RecoilRoot>
          <CssBaseline />
          <React.Suspense fallback={<Loader />}>
            <BrowserRouter>
              <Routes />
              <Toasts />
            </BrowserRouter>
          </React.Suspense>
        </RecoilRoot>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
