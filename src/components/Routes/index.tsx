import React from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Layout from '@src/components/Layout';
import Administrator from '@src/components/Routes/middlewares/Administrator';
import RedirectIfAdministrator from '@src/components/Routes/middlewares/RedirectIfAdministrator';
import CreateTrainingsScreen from '@src/screens/CreateTrainingsScreen';
import LoginScreen from '@src/screens/LoginScreen';
import NotFoundScreen from '@src/screens/NotFoundScreen';
import PrivacyScreen from '@src/screens/Privacy';
import TermsScreen from '@src/screens/Terms';
import TrainingsScreen from '@src/screens/TrainingsScreen';

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route path="*" element={<NotFoundScreen />} />
      <Route path="/privacy" element={<PrivacyScreen />} />
      <Route path="/terms" element={<TermsScreen />} />

      <Route element={<RedirectIfAdministrator />}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/oauth/naver" element={<LoginScreen />} />
      </Route>

      <Route
        element={
          <Administrator>
            <Layout />
          </Administrator>
        }
      >
        <Route path="/trainings" element={<TrainingsScreen />} />
        <Route path="/trainings/create" element={<CreateTrainingsScreen />} />
      </Route>
    </ReactRouterRoutes>
  );
};

export default Routes;
