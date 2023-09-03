import { MockedProvider } from '@apollo/client/testing';
import { MockedResponse } from '@apollo/client/testing/core';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { VERIFY } from '@src/operations/mutations/verify';
import { wrapper } from '@tests/functions';

import EmailVerifyScreen from './index';

describe('EmailVerifyScreen 컴포넌트', () => {
  const token = 'token';
  const mocks: ReadonlyArray<MockedResponse> = [
    {
      request: {
        query: VERIFY,
        variables: { token },
      },
      result: {
        data: { verify: true },
      },
    },
  ];
  const rendered = () =>
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={[`/email/verify?token=${token}`]}>
          <EmailVerifyScreen />
        </MemoryRouter>
      </MockedProvider>,
      { wrapper },
    );

  it('렌더링이 올바르게 된다', async () => {
    const { findByText } = rendered();

    expect(await findByText('이메일이 인증 되었습니다!')).toBeInTheDocument();
    expect(await findByText('홈으로 돌아가기')).toBeInTheDocument();
  });
});
