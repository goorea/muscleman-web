import React from 'react';
import { useRecoilValue } from 'recoil';

import Toast, { ToastProps } from '@src/components/Toast';
import { toastsState } from '@src/recoils';

const Toasts: React.FC = () => {
  const toasts = useRecoilValue<ToastProps[]>(toastsState);

  return toasts.length ? (
    <>
      {toasts.map(({ message, severity }, index) => (
        <Toast
          key={index}
          index={index}
          message={message}
          severity={severity}
        />
      ))}
    </>
  ) : null;
};

export default Toasts;
