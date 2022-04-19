import React from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import CreateTrainingsScreen from '@src/screens/CreateTrainingsScreen';
import LoginScreen from '@src/screens/LoginScreen';
import NotFoundScreen from '@src/screens/NotFoundScreen';
import TrainingsScreen from '@src/screens/TrainingsScreen';

const Routes: React.FC = () => (
  <ReactRouterRoutes>
    <Route path="*" element={<NotFoundScreen />} />
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/trainings" element={<TrainingsScreen />} />
    <Route path="/trainings/create" element={<CreateTrainingsScreen />} />
  </ReactRouterRoutes>
);

export default Routes;
