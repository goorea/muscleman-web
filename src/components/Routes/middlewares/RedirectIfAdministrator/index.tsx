import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useMockUser from '@src/hooks/useMockUser';
import { Role } from '@src/types/graphql';

type P = {
  children: JSX.Element;
};

const RedirectIfAdministrator: React.FC<P> = ({ children }) => {
  const user = useMockUser();
  const location = useLocation();

  if (user) {
    if (user.roles?.includes(Role.Admin)) {
      return <Navigate to="/trainings" state={{ from: location }} replace />;
    }

    // TODO: 로그아웃
  }

  return children;
};

export default RedirectIfAdministrator;
