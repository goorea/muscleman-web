import React from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Administrator from '@src/components/Routes/middlewares/Administrator';
import RedirectIfAdministrator from '@src/components/Routes/middlewares/RedirectIfAdministrator';
import CreateTrainingsScreen from '@src/screens/CreateTrainingsScreen';
import LoginScreen from '@src/screens/LoginScreen';
import NotFoundScreen from '@src/screens/NotFoundScreen';
import TrainingsScreen from '@src/screens/TrainingsScreen';

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route path="*" element={<NotFoundScreen />} />
      <Route
        path="/login"
        element={
          <RedirectIfAdministrator>
            <LoginScreen />
          </RedirectIfAdministrator>
        }
      />
      <Route
        path="/trainings"
        element={
          <Administrator>
            <TrainingsScreen />
          </Administrator>
        }
      />
      <Route
        path="/trainings/create"
        element={
          <Administrator>
            <CreateTrainingsScreen />
          </Administrator>
        }
      />
    </ReactRouterRoutes>
  );
};

export default Routes;
