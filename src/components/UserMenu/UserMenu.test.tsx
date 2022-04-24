import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { wrapper } from '@tests/functions';

import UserMenu from './index';

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn(),
}));

describe('UserMenu 컴포넌트', () => {
  const name = 'John';
  const rendered = () =>
    render(
      <MemoryRouter>
        <UserMenu />
      </MemoryRouter>,
      { wrapper },
    );

  beforeEach(() => {
    (useRecoilValue as jest.Mock).mockImplementation(({ key }) =>
      key === 'userSelector' ? { name } : null,
    );
  });

  it('렌더링이 올바르게 된다', () => {
    const { queryByText } = rendered();

    expect(queryByText(name)).not.toBeNull();
  });

  it('사용자 이름을 클릭하면 로그아웃 버튼이 보인다', () => {
    const { getByText, queryByText } = rendered();

    fireEvent.click(getByText(name));

    expect(queryByText('로그아웃')).not.toBeNull();
  });

  it('로그아웃 버튼을 누르면 로그아웃 된다', () => {
    sessionStorage.setItem('@token', 'loginned');
    const { getByText } = rendered();

    fireEvent.click(getByText(name));
    fireEvent.click(getByText('로그아웃'));

    expect(sessionStorage.getItem('@token')).toBeNull();
  });
});
