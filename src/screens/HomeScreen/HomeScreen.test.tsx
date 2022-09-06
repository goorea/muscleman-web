import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Routes from '@src/components/Routes';

describe('HomeScreen 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { queryByText, getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(queryByText('App Store')).not.toBeNull();

    expect(getByText('App Store').closest('a')).toHaveAttribute(
      'href',
      'https://apps.apple.com/us/app/%EA%B7%BC%EC%9C%A1%EB%A7%A8/id1590126894',
    );
  });
});
