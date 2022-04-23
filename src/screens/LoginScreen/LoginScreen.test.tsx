import { GraphQLRequest } from '@apollo/client/link/core';
import { MockedProvider } from '@apollo/client/testing';
import { MockedResponse } from '@apollo/client/testing/core';
import { act, fireEvent, render } from '@testing-library/react';
import { GraphQLError } from 'graphql';
import React from 'react';

import RecoilObserver from '@src/components/RecoilObserver';
import { ERROR_CODES } from '@src/hooks/useErrorEffect';
import { LOGIN } from '@src/operations/mutations/login';
import { JWTTokenState, toastsState } from '@src/recoils';
import LoginScreen from '@src/screens/LoginScreen/index';
import { userFactory, wrapper } from '@tests/functions';

describe('LoginScreen 컴포넌트', () => {
  const input = {
    email: 'john@example.com',
    password: '123123123',
    deviceID: 'test',
  };
  const request: GraphQLRequest = {
    query: LOGIN,
    variables: {
      input,
    },
  };
  const token = 'token';
  const refreshToken = 'refreshToken';
  const onChange = jest.fn();
  const rendered = (
    mocks: ReadonlyArray<MockedResponse> = [],
    node: any = toastsState,
  ) =>
    render(
      <>
        <RecoilObserver node={node} onChange={onChange} />
        <MockedProvider mocks={mocks}>
          <LoginScreen />
        </MockedProvider>
      </>,
      { wrapper },
    );

  it('렌더링이 올바르게 된다', () => {
    const { queryAllByText, getByLabelText, getByTestId } = rendered();

    expect(queryAllByText('로그인')).not.toBeNull();
    expect(getByLabelText('이메일')).not.toBeNull();
    expect(getByLabelText('비밀번호')).not.toBeNull();
    expect(getByLabelText('로그인 기억하기')).not.toBeNull();
    expect(getByTestId('googleLogin')).not.toBeNull();
    expect(getByTestId('appleLogin')).not.toBeNull();
    expect(getByTestId('naverLogin')).not.toBeNull();
    expect(getByTestId('kakaoLogin')).not.toBeNull();
  });

  it('이메일을 입력하지 않고 로그인 버튼을 누르면 오류 메세지가 보인다', async () => {
    const { getByRole, findByText } = rendered();

    fireEvent.click(
      getByRole('button', {
        name: '로그인',
      }),
    );

    expect(await findByText('이메일을 입력해주세요')).toBeVisible();
  });

  it('비밀번호를 입력하지 않고 로그인 버튼을 누르면 오류 메세지가 보인다', async () => {
    const { getByRole, findByText } = rendered();

    fireEvent.click(
      getByRole('button', {
        name: '로그인',
      }),
    );

    expect(await findByText('비밀번호를 입력해주세요')).toBeVisible();
  });

  it('이메일 형식이 올바르지 않고 로그인 버튼을 누르면 오류 메세지가 보인다', async () => {
    const { getByLabelText, getByRole, findByText } = rendered();

    fireEvent.input(getByLabelText('이메일'), { target: { value: 'Hello!' } });
    fireEvent.click(
      getByRole('button', {
        name: '로그인',
      }),
    );

    expect(await findByText('이메일 형식이 아닙니다')).toBeVisible();
  });

  it('비밀번호가 8글자보다 적고 로그인 버튼을 누르면 오류 메세지가 보인다', async () => {
    const { getByLabelText, getByRole, findByText } = rendered();

    fireEvent.input(getByLabelText('비밀번호'), {
      target: { value: '1234567' },
    });
    fireEvent.click(
      getByRole('button', {
        name: '로그인',
      }),
    );

    expect(await findByText('8글자보다 적습니다')).toBeVisible();
  });

  it('존재하지 않는 사용자 정보를 입력 했을 때 오류 메세지가 보인다', async () => {
    const mocks = [
      {
        request,
        result: {
          errors: [
            new GraphQLError('', null, null, null, null, null, {
              code: ERROR_CODES.DOCUMENT_NOT_FOUND_ERROR,
            }),
          ],
        },
      },
    ];
    const { getByLabelText, getByRole, findByText } = rendered(mocks);

    fireEvent.input(getByLabelText('이메일'), {
      target: { value: input.email },
    });
    fireEvent.input(getByLabelText('비밀번호'), {
      target: { value: input.password },
    });
    fireEvent.click(
      getByRole('button', {
        name: '로그인',
      }),
    );

    expect(await findByText('존재하지 않는 사용자 입니다')).toBeVisible();
  });

  it('소셜 로그인으로 가입한 사용자가 로그인 버튼을 누르면 오류 메세지가 보인다', async () => {
    const mocks = [
      {
        request,
        result: {
          errors: [
            new GraphQLError('', null, null, null, null, null, {
              code: ERROR_CODES.BAD_USER_INPUT,
            }),
          ],
        },
      },
    ];
    const { getByLabelText, getByRole, findByText } = rendered(mocks);

    fireEvent.input(getByLabelText('이메일'), {
      target: { value: input.email },
    });
    fireEvent.input(getByLabelText('비밀번호'), {
      target: { value: input.password },
    });
    fireEvent.click(
      getByRole('button', {
        name: '로그인',
      }),
    );

    expect(await findByText('소셜 로그인으로 다시 시도해주세요')).toBeVisible();
  });

  it('유효성 검사에 실패 했을 때 오류 메세지가 보인다', async () => {
    const message = '유효성 검사에 실패했습니다.';
    const mocks = [
      {
        request,
        result: {
          errors: [
            new GraphQLError(message, null, null, null, null, null, {
              code: ERROR_CODES.GRAPHQL_VALIDATION_FAILED,
            }),
          ],
        },
      },
    ];
    const { getByLabelText, getByRole, findByText } = rendered(mocks);

    fireEvent.input(getByLabelText('이메일'), {
      target: { value: input.email },
    });
    fireEvent.input(getByLabelText('비밀번호'), {
      target: { value: input.password },
    });
    fireEvent.click(
      getByRole('button', {
        name: '로그인',
      }),
    );

    expect(await findByText(message)).toBeVisible();
  });

  it('비밀번호가 올바르지 않았을 때 오류 메세지가 보인다', async () => {
    const message = '사용자 정보가 올바르지 않습니다.';
    const mocks = [
      {
        request,
        result: {
          errors: [
            new GraphQLError(message, null, null, null, null, null, {
              code: ERROR_CODES.AUTHENTICATE_FAILED_ERROR,
            }),
          ],
        },
      },
    ];
    const { getByLabelText, getByRole, findByText } = rendered(mocks);

    fireEvent.input(getByLabelText('이메일'), {
      target: { value: input.email },
    });
    fireEvent.input(getByLabelText('비밀번호'), {
      target: { value: input.password },
    });
    fireEvent.click(
      getByRole('button', {
        name: '로그인',
      }),
    );

    expect(await findByText(message)).toBeVisible();
  });

  it('이미 로그인한 사용자가 로그인 버튼을 누르면 토스트 메세지가 보인다', async () => {
    const mocks = [
      {
        request,
        result: {
          errors: [
            new GraphQLError('', null, null, null, null, null, {
              code: ERROR_CODES.FORBIDDEN_ERROR,
            }),
          ],
        },
      },
    ];
    const { getByLabelText, getByRole } = rendered(mocks);

    fireEvent.input(getByLabelText('이메일'), {
      target: { value: input.email },
    });
    fireEvent.input(getByLabelText('비밀번호'), {
      target: { value: input.password },
    });

    await act(() => {
      fireEvent.click(
        getByRole('button', {
          name: '로그인',
        }),
      );
    });

    expect(onChange.mock.calls).toEqual([
      [[]],
      [
        [
          {
            message: '이미 로그인 하셨어요!',
            severity: 'error',
          },
        ],
      ],
    ]);
  });

  it('올바른 정보를 입력하고 로그인 버튼을 누르면 JWTToken과 sessionStorage가 등록된다', async () => {
    const mocks = [
      {
        request,
        result: {
          data: {
            login: {
              token,
              refreshToken,
              user: userFactory(),
            },
          },
        },
      },
    ];
    const { getByLabelText, getByRole } = rendered(mocks, JWTTokenState);

    fireEvent.input(getByLabelText('이메일'), {
      target: { value: input.email },
    });
    fireEvent.input(getByLabelText('비밀번호'), {
      target: { value: input.password },
    });

    await act(() => {
      fireEvent.click(
        getByRole('button', {
          name: '로그인',
        }),
      );
    });

    expect(onChange).toBeCalledWith(token);
    expect(sessionStorage.getItem('@token')).toEqual(token);
  });

  it('로그인 기억하기를 체크하고 로그인 한다면 localStorage에 JWTToken과 refreshToekn이 등록된다', async () => {
    const mocks = [
      {
        request,
        result: {
          data: {
            login: {
              token,
              refreshToken,
              user: userFactory(),
            },
          },
        },
      },
    ];
    const { getByLabelText, getByRole } = rendered(mocks, JWTTokenState);

    fireEvent.input(getByLabelText('이메일'), {
      target: { value: input.email },
    });
    fireEvent.input(getByLabelText('비밀번호'), {
      target: { value: input.password },
    });
    fireEvent.click(getByLabelText('로그인 기억하기'));

    await act(() => {
      fireEvent.click(
        getByRole('button', {
          name: '로그인',
        }),
      );
    });

    expect(onChange).toBeCalledWith(token);
    expect(sessionStorage.getItem('@token')).toEqual(token);
    expect(localStorage.getItem('@token')).toEqual(token);
    expect(localStorage.getItem('@refreshToken')).toEqual(refreshToken);
  });
});
