import { gql, useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions } from '@apollo/client/react';
import { Dispatch, SetStateAction } from 'react';
import { useSetRecoilState } from 'recoil';

import { AUTHENTICATION_RESPONSE_FIELDS } from '@src/fragments/user';
import { ERROR_CODES } from '@src/hooks/useErrorEffect';
import { JWTTokenState, toastsState } from '@src/recoils';
import { Mutation, MutationLoginArgs } from '@src/types/graphql';

export const LOGIN = gql`
  ${AUTHENTICATION_RESPONSE_FIELDS}
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...AuthenticationResponseFields
    }
  }
`;

export const useLogin = (
  remember: boolean,
  setErrorMessages: Dispatch<SetStateAction<string[]>>,
): ((
  options?: MutationFunctionOptions<Pick<Mutation, 'login'>, MutationLoginArgs>,
) => Promise<FetchResult<Pick<Mutation, 'login'>>>) => {
  const setToast = useSetRecoilState(toastsState);
  const setJWTToken = useSetRecoilState(JWTTokenState);
  const [login] = useMutation<Pick<Mutation, 'login'>, MutationLoginArgs>(
    LOGIN,
    {
      onCompleted: data => {
        const { token, refreshToken } = data.login;

        if (remember) {
          localStorage.setItem('@token', token);
          localStorage.setItem('@refreshToken', refreshToken);
        }

        sessionStorage.setItem('@token', token);
        setJWTToken(token);
      },
      onError: error => {
        setErrorMessages(
          error?.graphQLErrors
            .map(e => {
              const code = e.extensions?.code;

              if (code === ERROR_CODES.DOCUMENT_NOT_FOUND_ERROR) {
                return '존재하지 않는 사용자 입니다';
              } else if (code === ERROR_CODES.BAD_USER_INPUT) {
                return '소셜 로그인으로 다시 시도해주세요';
              } else if (
                [
                  ERROR_CODES.GRAPHQL_VALIDATION_FAILED,
                  ERROR_CODES.AUTHENTICATE_FAILED_ERROR,
                ].includes(e.extensions?.code)
              ) {
                return e.message;
              } else if (code === ERROR_CODES.FORBIDDEN_ERROR) {
                setToast(prevState =>
                  prevState.concat({
                    message: '이미 로그인 하셨어요!',
                    severity: 'error',
                  }),
                );

                return '';
              }

              setToast(prevState =>
                prevState.concat({
                  message: e.message,
                  severity: 'error',
                }),
              );

              return '';
            })
            .filter(message => message) || [],
        );
      },
    },
  );

  return login;
};
