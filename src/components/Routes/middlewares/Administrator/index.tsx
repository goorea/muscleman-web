import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useMockUser } from '@src/hooks/useMockUser';

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

  if (!user.roles.includes('ADMIN')) {
    // TODO: 로그아웃

    return NavigateToLogin;
  }

  return children;
};

export default Administrator;
