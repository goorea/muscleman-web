import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Footer from '@src/components/Footer/index';
import { wrapper } from '@tests/functions';

describe('Footer 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
      { wrapper },
    );

    expect(queryByText('정형석, 김지연')).not.toBeNull();
    expect(queryByText('경기도 의정부시 서광로 166')).not.toBeNull();
    expect(queryByText('010-2414-8641')).not.toBeNull();
    expect(queryByText('muscleman@muscleman.kr')).not.toBeNull();
    expect(queryByText('이용약관')).not.toBeNull();
    expect(queryByText('개인정보처리방침')).not.toBeNull();
  });
});
