import { MockedProvider } from '@apollo/client/testing';
import { MockedResponse } from '@apollo/client/testing/core';
import { act, fireEvent, render } from '@testing-library/react';
import { GraphQLError } from 'graphql';
import { pick } from 'lodash';
import React from 'react';
import { RecoilState, useRecoilState } from 'recoil';

import EditTraningModal from '@src/components/EditTrainingModal/index';
import RecoilObserver from '@src/components/RecoilObserver';
import { UPDATE_TRAINING } from '@src/operations/mutations/updateTraining';
import { trainingsState } from '@src/screens/TrainingsScreen/recoils';
import { Training } from '@src/types/graphql';
import { trainingFactory, wrapper } from '@tests/functions';

describe('EditTrainingModal 컴포넌트', () => {
  const training = trainingFactory();
  const setEditingTraining = jest.fn();
  const onChange = jest.fn();
  const rendered = (mocks: ReadonlyArray<MockedResponse> = []) =>
    render(
      <>
        <RecoilObserver node={trainingsState} onChange={onChange} />
        <MockedProvider mocks={mocks}>
          <EditTraningModal />
        </MockedProvider>
      </>,
      { wrapper },
    );

  beforeEach(() => {
    (useRecoilState as jest.Mock).mockImplementation(
      ({ key }: RecoilState<Training | null>) =>
        key === 'editingTrainingState'
          ? [training, setEditingTraining]
          : [null, jest.fn()],
    );
  });

  it('렌더링이 올바르게 된다', async () => {
    const { queryByLabelText, queryByText } = rendered();

    expect(queryByLabelText('이름')).not.toBeNull();
    expect(queryByText('카테고리')).not.toBeNull();
    expect(queryByText('타입')).not.toBeNull();
    expect(queryByLabelText('선호도')).not.toBeNull();
    expect(queryByLabelText('썸네일 경로')).not.toBeNull();
    expect(queryByLabelText('비디오 경로')).not.toBeNull();
    expect(queryByText('저장')).not.toBeNull();
  });

  it('이름을 입력하지 않고 저장 버튼을 누르면 오류 메세지가 보인다', async () => {
    const { getByText, findByText, getByLabelText } = rendered();

    fireEvent.input(getByLabelText('이름'), { target: { value: '' } });
    fireEvent.click(getByText('저장'));

    expect(await findByText('이름을 입력해주세요')).toBeVisible();
  });

  it('GraphQL에서 반환하는 오류가 있다면 보인다', async () => {
    const messages = ['It', 'is', 'error', 'message'];
    const mocks: ReadonlyArray<MockedResponse> = [
      {
        request: {
          query: UPDATE_TRAINING,
          variables: {
            _id: training._id,
            input: pick(training, [
              'name',
              'category',
              'type',
              'description',
              'preference',
              'thumbnailPath',
              'videoPath',
            ]),
          },
        },
        result: {
          errors: messages.map(message => new GraphQLError(message)),
        },
      },
    ];

    const { getByText, findByText } = rendered(mocks);

    fireEvent.click(getByText('저장'));

    await Promise.all(
      messages.map(async message => {
        expect(await findByText(message)).toBeVisible();
      }),
    );
  });

  it('유효한 정보를 입력하고 저장 버튼을 누르면 운동종목이 변경되고 editingTraining이 null이 된다', async () => {
    const afterTraining = trainingFactory();
    const mocks: ReadonlyArray<MockedResponse> = [
      {
        request: {
          query: UPDATE_TRAINING,
          variables: {
            _id: training._id,
            input: pick(afterTraining, [
              'name',
              'category',
              'type',
              'description',
              'preference',
              'thumbnailPath',
              'videoPath',
            ]),
          },
        },
        result: {
          data: {
            updateTraining: true,
          },
        },
      },
    ];

    const { getByText, getByLabelText, getByTestId } = rendered(mocks);

    fireEvent.input(getByLabelText('이름'), {
      target: { value: afterTraining.name },
    });
    fireEvent.change(getByTestId('category'), {
      target: { value: afterTraining.category },
    });
    fireEvent.change(getByTestId('type'), {
      target: { value: afterTraining.type },
    });
    fireEvent.input(getByLabelText('설명'), {
      target: { value: afterTraining.description },
    });
    fireEvent.input(getByLabelText('선호도'), {
      target: { value: afterTraining.preference },
    });
    fireEvent.input(getByLabelText('썸네일 경로'), {
      target: { value: afterTraining.thumbnailPath },
    });
    fireEvent.input(getByLabelText('비디오 경로'), {
      target: { value: afterTraining.videoPath },
    });

    await act(() => {
      fireEvent.click(getByText('저장'));
    });

    expect(onChange).toBeCalled();
    expect(setEditingTraining).toBeCalledWith(null);
  });
});
