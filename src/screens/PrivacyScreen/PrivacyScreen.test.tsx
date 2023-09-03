import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Routes from '@src/components/Routes';
import { wrapper } from '@tests/functions';

describe('PrivcyScreen 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/privacy']}>
        <Routes />
      </MemoryRouter>,
      {
        wrapper,
      },
    );

    expect(queryByText('개인정보처리방침')).not.toBeNull();
  });
});
