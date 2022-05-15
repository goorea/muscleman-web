import { MockedProvider } from '@apollo/client/testing';
import { MockedResponse } from '@apollo/client/testing/core';
import {
  act,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import RecoilObserver from '@src/components/RecoilObserver';
import { DELETE_TRAINING } from '@src/operations/mutations/deleteTraining';
import TrainingsScreen from '@src/screens/TrainingsScreen/index';
import { trainingsState } from '@src/screens/TrainingsScreen/recoils';
import { trainingFactory, wrapper } from '@tests/functions';

describe('TrainingsScreen 컴포넌트', () => {
  const onChange = jest.fn();
  const trainings = [...Array(10)].map(() => trainingFactory());
  const mocks: ReadonlyArray<MockedResponse> = [
    {
      request: {
        query: DELETE_TRAINING,
        variables: {
          _id: trainings.sort((a, b) =>
            dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? -1 : 1,
          )[0]._id,
        },
      },
      result: {
        data: {
          deleteTraining: true,
        },
      },
    },
  ];

  beforeEach(async () => {
    (useRecoilState as jest.Mock).mockImplementation(({ key }) =>
      key === 'trainingState' ? [trainings, jest.fn()] : [null, jest.fn()],
    );

    render(
      <>
        <RecoilObserver node={trainingsState} onChange={onChange} />
        <MemoryRouter initialEntries={['/trainings']}>
          <MockedProvider mocks={mocks}>
            <TrainingsScreen />
          </MockedProvider>
        </MemoryRouter>
      </>,
      { wrapper },
    );

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));
  });

  it('렌더링이 올바르게 된다', () => {
    expect(screen.queryByText('이름')).not.toBeNull();
    expect(screen.queryByText('카테고리')).not.toBeNull();
    expect(screen.queryByText('타입')).not.toBeNull();
    expect(screen.queryByText('설명')).not.toBeNull();
    expect(screen.queryByText('선호도')).not.toBeNull();
    expect(screen.queryByText('썸네일')).not.toBeNull();
    expect(screen.queryByText('비디오')).not.toBeNull();
    expect(screen.queryByText('생성일')).not.toBeNull();
    expect(screen.queryByText('변경일')).not.toBeNull();
    expect(screen.queryAllByText('수정')).toHaveLength(trainings.length + 1);
  });

  it('선택한 종목을 삭제할 수 있다', async () => {
    fireEvent.click(screen.getByTestId('trainings-table-checkbox-0'));

    await act(async () => {
      fireEvent.click(screen.getByTestId('deleteButton'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('확인'));
    });

    await act(async () => {
      expect(onChange).toBeCalled();
    });
  });
});
