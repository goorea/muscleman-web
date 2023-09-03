import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ToastProps } from '@src/components/Toast';
import useLogout from '@src/hooks/useLogout';
import { toastsState, userSelector } from '@src/recoils';
import { Role } from '@src/types/graphql';

type P = {
  children: JSX.Element;
};

const Administrator: React.FC<P> = ({ children }) => {
  const location = useLocation();
  const user = useRecoilValue(userSelector);
  const setToast = useSetRecoilState<ToastProps[]>(toastsState);
  const logout = useLogout();

  useEffect(() => {
    if (!user) {
      return setToast(prevState =>
        prevState.concat({
          message: '로그인 후에 이용 가능합니다.',
          severity: 'error',
        }),
      );
    }

    if (!user.roles?.includes(Role.Admin)) {
      setToast(prevState =>
        prevState.concat({
          message: '권한이 없습니다.',
          severity: 'error',
        }),
      );
      logout();
    }
  }, [logout, setToast, user]);

  if (!user || !user.roles?.includes(Role.Admin)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default Administrator;
