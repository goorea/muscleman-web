import { render } from '@testing-library/react';
import React from 'react';
import { RecoilState, useRecoilValue } from 'recoil';

import { ToastProps } from '@src/components/Toast';
import Toasts from '@src/components/Toasts/index';
import { wrapper } from '@tests/functions';

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn(),
}));

describe('Toasts 컴포넌트', () => {
  it('toastsState의 길이만큼 Toast를 렌더링한다', () => {
    const count = 5;
    (useRecoilValue as jest.Mock).mockImplementation(
      ({ key }: RecoilState<ToastProps[]>) =>
        key === 'toastsState'
          ? [...Array(count)].map((_, index) => ({
              message: `message${index}`,
              severity: 'success',
            }))
          : null,
    );

    const { container } = render(<Toasts />, { wrapper });

    expect(container.childElementCount).toEqual(count);
  });
});
