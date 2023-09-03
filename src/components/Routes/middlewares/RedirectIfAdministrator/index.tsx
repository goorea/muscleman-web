import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ToastProps } from '@src/components/Toast';
import useLogout from '@src/hooks/useLogout';
import { toastsState, userSelector } from '@src/recoils';
import { Role } from '@src/types/graphql';

const RedirectIfAdministrator: React.FC = () => {
  const location = useLocation();
  const user = useRecoilValue(userSelector);
  const setToast = useSetRecoilState<ToastProps[]>(toastsState);
  const logout = useLogout();

  useEffect(() => {
    if (user) {
      if (user.roles?.includes(Role.Admin)) {
        setToast(prevState =>
          prevState.concat({
            message: `${user.name}님, 환영합니다!`,
            severity: 'success',
          }),
        );
      } else {
        setToast(prevState =>
          prevState.concat({
            message: '권한이 없습니다.',
            severity: 'error',
          }),
        );
        logout();
      }
    }
  }, [logout, setToast, user]);

  if (user?.roles?.includes(Role.Admin)) {
    return <Navigate to="/trainings" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RedirectIfAdministrator;
