import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useMockUser from '@src/hooks/useMockUser';

type P = {
  children: JSX.Element;
};

const RedirectIfAdministrator: React.FC<P> = ({ children }) => {
  const user = useMockUser();
  const location = useLocation();

  if (user) {
    if (user.roles.includes('ADMIN')) {
      return <Navigate to="/trainings" state={{ from: location }} replace />;
    }

    // TODO: 로그아웃
  }

  return children;
};

export default RedirectIfAdministrator;
