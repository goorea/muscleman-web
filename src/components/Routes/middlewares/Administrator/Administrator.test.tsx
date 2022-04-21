import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilState, useRecoilValue } from 'recoil';

import Routes from '@src/components/Routes';
import { Role, User } from '@src/types/graphql';
import { userFactory, wrapper } from '@tests/functions';

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn(),
}));

describe('Administator 컴포넌트', () => {
  const rendered = () =>
    render(
      <MemoryRouter initialEntries={['/trainings']}>
        <Routes />
      </MemoryRouter>,
      {
        wrapper,
      },
    );

  it('사용자 정보가 없다면 login 페이지로 replace 한다', () => {
    (useRecoilValue as jest.Mock).mockImplementation(
      ({ key }: RecoilState<User | null>) =>
        key === 'userState' ? userFactory({ roles: [] }) : null,
    );

    const { queryByText } = rendered();

    expect(queryByText('Login Screen')).not.toBeNull();
  });

  it('사용자 정보가 있지만 ADMIN 권한을 가지고 있지 않다면 login 페이지로 replace 한다', () => {
    (useRecoilValue as jest.Mock).mockImplementation(
      ({ key }: RecoilState<User | null>) =>
        key === 'userState' ? userFactory({ roles: [Role.Verified] }) : null,
    );

    const { queryByText } = rendered();

    expect(queryByText('Login Screen')).not.toBeNull();
  });
});
