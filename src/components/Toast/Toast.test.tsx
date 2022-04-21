import { render } from '@testing-library/react';
import React from 'react';

import Toast from '@src/components/Toast/index';
import { wrapper } from '@tests/functions';

describe('Toast 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const message = 'message';
    const { queryByText } = render(
      <Toast message={message} severity="warning" index={0} />,
      {
        wrapper,
      },
    );

    expect(queryByText(message)).not.toBeNull();
  });
});
