import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ToastProps } from '@src/components/Toast';
import { toastsState, userState } from '@src/recoils';
import { Role } from '@src/types/graphql';

type P = {
  children: JSX.Element;
};

const Administrator: React.FC<P> = ({ children }) => {
  const location = useLocation();
  const user = useRecoilValue(userState);
  const setToast = useSetRecoilState<ToastProps[]>(toastsState);

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
    }
  }, [setToast, user]);

  // TODO: 로그아웃

  if (!user || !user.roles?.includes(Role.Admin)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default Administrator;
