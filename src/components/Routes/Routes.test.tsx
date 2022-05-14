import { MockedProvider } from '@apollo/client/testing';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilState, useRecoilValue } from 'recoil';

import { TRAININGS } from '@src/operations/queries/trainings';
import { Role, User } from '@src/types/graphql';
import { userFactory, wrapper } from '@tests/functions';

import Routes from './index';

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn(),
}));

describe('Routes 컴포넌트', () => {
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
    const { queryByTestId } = rendered('/login');

    expect(queryByTestId('loginScreen')).not.toBeNull();
  });

  it('/trainings 경로는 TrainingsScreen을 보여준다', async () => {
    (useRecoilValue as jest.Mock).mockImplementation(
      ({ key }: RecoilState<User | null>) =>
        key === 'userSelector' ? userFactory({ roles: [Role.Admin] }) : null,
    );

    const { queryByTestId } = render(
      <MemoryRouter initialEntries={['/trainings']}>
        <MockedProvider
          mocks={[
            {
              request: {
                query: TRAININGS,
              },
              result: {
                data: {
                  trainings: [],
                },
              },
            },
          ]}
        >
          <Routes />
        </MockedProvider>
      </MemoryRouter>,
      {
        wrapper,
      },
    );

    await waitForElementToBeRemoved(() => queryByTestId('loader'));

    expect(queryByTestId('trainingsScreen')).not.toBeNull();
  });

  it('/trainings/create 경로는 CreateTrainingsScreen을 보여준다', () => {
    (useRecoilValue as jest.Mock).mockImplementation(
      ({ key }: RecoilState<User | null>) =>
        key === 'userSelector' ? userFactory({ roles: [Role.Admin] }) : null,
    );

    const { queryByText } = rendered('/trainings/create');

    expect(queryByText('Create Trainings Screen')).not.toBeNull();
  });

  it('유효하지 않은 경로는 NotFoundScreen을 보여준다', () => {
    const { queryByTestId } = rendered('/not/found');

    expect(queryByTestId('notFoundScreen')).not.toBeNull();
  });
});
