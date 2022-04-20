import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Routes from '@src/components/Routes';
import useMockUser from '@src/hooks/useMockUser';

jest.mock('@src/hooks/useMockUser', () => ({
  __esModule: true,
  default: jest.fn(),
  useMockUser: () => ({ roles: ['ADMIN'] }),
}));

describe('RedirectIfAdministrator 컴포넌트', () => {
  it('사용자 정보가 있고, ADMIN 권한을 가지고 있다면 trainings 페이지로 replace 한다', () => {
    (useMockUser as jest.Mock).mockReturnValue({ roles: ['ADMIN'] });

    const { queryByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(queryByText('Trainings Screen')).not.toBeNull();
  });
});
