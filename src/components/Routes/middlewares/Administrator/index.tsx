import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useMockUser } from '@src/hooks/useMockUser';
import { Role } from '@src/types/graphql';

type P = {
  children: JSX.Element;
};

const Administrator: React.FC<P> = ({ children }) => {
  const user = useMockUser();
  const location = useLocation();
  const NavigateToLogin = (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  if (!user) {
    return NavigateToLogin;
  }

  if (!user.roles?.includes(Role.Admin)) {
    // TODO: 로그아웃

    return NavigateToLogin;
  }

  return children;
};

export default Administrator;
