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

describe('RedirectIfAdministrator 컴포넌트', () => {
  it('사용자 정보가 있고, ADMIN 권한을 가지고 있다면 trainings 페이지로 replace 한다', () => {
    (useRecoilValue as jest.Mock).mockImplementation(
      ({ key }: RecoilState<User | null>) =>
        key === 'userState' ? userFactory({ roles: [Role.Admin] }) : null,
    );

    const { queryByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes />
      </MemoryRouter>,
      {
        wrapper,
      },
    );

    expect(queryByText('Trainings Screen')).not.toBeNull();
  });
});
