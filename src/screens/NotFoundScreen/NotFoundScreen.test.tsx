import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Routes from '@src/components/Routes';
import { wrapper } from '@tests/functions';

describe('NotFoundScreen 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/not/found']}>
        <Routes />
      </MemoryRouter>,
      {
        wrapper,
      },
    );

    expect(queryByText('404')).not.toBeNull();
    expect(queryByText('이런! 페이지를 찾을 수 없습니다.')).not.toBeNull();
    expect(
      queryByText(/죄송합니다. 찾으시는 페이지가 없습니다./),
    ).not.toBeNull();
    expect(
      queryByText(/만약 무언가가 고장났다고 생각되신다면 문의해주세요!/),
    ).not.toBeNull();
    expect(queryByText('문의하기')).not.toBeNull();
  });
});
