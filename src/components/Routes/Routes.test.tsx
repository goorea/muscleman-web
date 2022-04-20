import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import useMockUser from '@src/hooks/useMockUser';

import Routes from './index';

jest.mock('@src/hooks/useMockUser', () => ({
  __esModule: true,
  default: jest.fn(),
  useMockUser: () => ({ roles: ['ADMIN'] }),
}));

describe('Router 컴포넌트', () => {
  const rendered = (path: string) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes />
      </MemoryRouter>,
    );

  it('/login 경로는 LoginScreen을 보여준다', () => {
    (useMockUser as jest.Mock).mockReturnValue(undefined);

    const { queryByText } = rendered('/login');

    expect(queryByText('Login Screen')).not.toBeNull();
  });

  it('/trainings 경로는 TrainingsScreen을 보여준다', () => {
    (useMockUser as jest.Mock).mockReturnValue({ roles: ['ADMIN'] });

    const { queryByText } = render(
      <MemoryRouter initialEntries={['/trainings']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(queryByText('Trainings Screen')).not.toBeNull();
  });

  it('/trainings/create 경로는 CreateTrainingsScreen을 보여준다', () => {
    (useMockUser as jest.Mock).mockReturnValue({ roles: ['ADMIN'] });

    const { queryByText } = rendered('/trainings/create');

    expect(queryByText('Create Trainings Screen')).not.toBeNull();
  });

  it('유효하지 않은 경로는 NotFoundScreen을 보여준다', () => {
    const { queryByText } = rendered('/not/found');

    expect(queryByText('Not Found Screen')).not.toBeNull();
  });
});
