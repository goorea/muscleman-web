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
    useMockUser: () => ({ roles: [Role.Verified] }),
  };
});

describe('Administator 컴포넌트', () => {
  it('사용자 정보가 없다면 login 페이지로 replace 한다', () => {
    (useMockUser as jest.Mock).mockReturnValue(undefined);

    const { queryByText } = render(
      <MemoryRouter initialEntries={['/trainings']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(queryByText('Login Screen')).not.toBeNull();
  });

  it('사용자 정보가 있지만 ADMIN 권한을 가지고 있지 않다면 login 페이지로 replace 한다', () => {
    (useMockUser as jest.Mock).mockReturnValue({ roles: [Role.Verified] });

    const { queryByText } = render(
      <MemoryRouter initialEntries={['/trainings']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(queryByText('Login Screen')).not.toBeNull();
  });
});
