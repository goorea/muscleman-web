import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Routes from '@src/components/Routes';
import { wrapper } from '@tests/functions';

describe('TermsScreen 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/terms']}>
        <Routes />
      </MemoryRouter>,
      {
        wrapper,
      },
    );

    expect(queryByText('이용약관')).not.toBeNull();
  });
});
