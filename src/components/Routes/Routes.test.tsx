import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilState, useRecoilValue } from 'recoil';

import { Role, User } from '@src/types/graphql';
import { userFactory, wrapper } from '@tests/functions';

import Routes from './index';

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn(),
}));

describe('Router 컴포넌트', () => {
  const rendered = (path: string) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes />
      </MemoryRouter>,
      {
        wrapper,
      },
    );

  it('/login 경로는 LoginScreen을 보여준다', () => {
    (useRecoilValue as jest.Mock).mockImplementation(
      ({ key }: RecoilState<User | null>) =>
        key === 'userState' ? userFactory({ roles: [] }) : null,
    );

    const { queryByText } = rendered('/login');

    expect(queryByText('Login Screen')).not.toBeNull();
  });

  it('/trainings 경로는 TrainingsScreen을 보여준다', () => {
    (useRecoilValue as jest.Mock).mockImplementation(
      ({ key }: RecoilState<User | null>) =>
        key === 'userState' ? userFactory({ roles: [Role.Admin] }) : null,
    );

    const { queryByText } = render(
      <MemoryRouter initialEntries={['/trainings']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(queryByText('Trainings Screen')).not.toBeNull();
  });

  it('/trainings/create 경로는 CreateTrainingsScreen을 보여준다', () => {
    (useRecoilValue as jest.Mock).mockImplementation(
      ({ key }: RecoilState<User | null>) =>
        key === 'userState' ? userFactory({ roles: [Role.Admin] }) : null,
    );

    const { queryByText } = rendered('/trainings/create');

    expect(queryByText('Create Trainings Screen')).not.toBeNull();
  });

  it('유효하지 않은 경로는 NotFoundScreen을 보여준다', () => {
    const { queryByText } = rendered('/not/found');

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
