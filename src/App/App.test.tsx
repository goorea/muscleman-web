import { render } from '@testing-library/react';
import React from 'react';
import { useRecoilValue } from 'recoil';

import App from './index';

describe('App 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    (useRecoilValue as jest.Mock).mockImplementation(({ key }) =>
      key === 'toastsState' ? [] : null,
    );

    const { container } = render(<App />);

    expect(container).not.toBeNull();
  });
});
