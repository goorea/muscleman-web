import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Routes from '@src/components/Routes';
import useMockUser from '@src/hooks/useMockUser';

jest.mock('@src/hooks/useMockUser', () => ({
  __esModule: true,
  default: jest.fn(),
  useMockUser: () => ({ roles: ['VERIFIED'] }),
}));

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
    (useMockUser as jest.Mock).mockReturnValue({ roles: ['VERIFIED'] });

    const { queryByText } = render(
      <MemoryRouter initialEntries={['/trainings']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(queryByText('Login Screen')).not.toBeNull();
  });
});
