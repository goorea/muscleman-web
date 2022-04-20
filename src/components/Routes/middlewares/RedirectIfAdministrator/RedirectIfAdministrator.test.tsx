import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Routes from '@src/components/Routes';
import useMockUser from '@src/hooks/useMockUser';
import { Role } from '@src/types/graphql';

jest.mock('@src/hooks/useMockUser', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Role } = require('@src/types/graphql');

  return {
    __esModule: true,
    default: jest.fn(),
    useMockUser: () => ({ roles: [Role.Admin] }),
  };
});

describe('RedirectIfAdministrator 컴포넌트', () => {
  it('사용자 정보가 있고, ADMIN 권한을 가지고 있다면 trainings 페이지로 replace 한다', () => {
    (useMockUser as jest.Mock).mockReturnValue({ roles: [Role.Admin] });

    const { queryByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(queryByText('Trainings Screen')).not.toBeNull();
  });
});
