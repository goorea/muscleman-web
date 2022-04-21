import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ToastProps } from '@src/components/Toast';
import { toastsState, userState } from '@src/recoils';
import { Role } from '@src/types/graphql';

type P = {
  children: JSX.Element;
};

const RedirectIfAdministrator: React.FC<P> = ({ children }) => {
  const location = useLocation();
  const user = useRecoilValue(userState);
  const setToast = useSetRecoilState<ToastProps[]>(toastsState);

  useEffect(() => {
    if (user?.roles?.includes(Role.Admin)) {
      setToast(prevState =>
        prevState.concat({
          message: '이미 로그인 하셨습니다.',
          severity: 'warning',
        }),
      );
    }
  }, [setToast, user]);

  // TODO: 로그아웃

  if (user?.roles?.includes(Role.Admin)) {
    return <Navigate to="/trainings" state={{ from: location }} replace />;
  }

  return children;
};

export default RedirectIfAdministrator;
