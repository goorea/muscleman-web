import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { ToastProps } from '@src/components/Toast';
import { toastsState } from '@src/recoils';

const useSnackbar = (index: number) => {
  const [open, setOpen] = useState<boolean>(true);
  const setToast = useSetRecoilState<ToastProps[]>(toastsState);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleExited = () => {
    setToast(prevState =>
      prevState.filter((_, prevIndex) => prevIndex !== index),
    );
  };

  return {
    open,
    handleClose,
    handleExited,
  };
};

export default useSnackbar;
