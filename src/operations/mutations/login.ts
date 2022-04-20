import { gql, useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions, MutationResult } from '@apollo/client/react';

import { AUTHENTICATION_RESPONSE_FIELDS } from '@src/fragments/user';
import { ERROR_CODES } from '@src/hooks/useErrorEffect';
import { Mutation, MutationLoginArgs } from '@src/types/graphql';

export const LOGIN = gql`
  ${AUTHENTICATION_RESPONSE_FIELDS}
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...AuthenticationResponseFields
    }
  }
`;

export const useLoginMutation = (): [
  (
    options?: MutationFunctionOptions<
      Pick<Mutation, 'login'>,
      MutationLoginArgs
    >,
  ) => Promise<FetchResult<Pick<Mutation, 'login'>>>,
  Pick<MutationResult<Pick<Mutation, 'login'>>, 'data' | 'loading'> & {
    errorMessages: string[];
  },
] => {
  const [login, { data, error, loading }] = useMutation<
    Pick<Mutation, 'login'>,
    MutationLoginArgs
  >(LOGIN);
  const errorMessages =
    error?.graphQLErrors.map(e => {
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
        // TODO: flash({
        //   title: '접근불가!',
        //   contents: '이미 로그인 하셨어요!',
        //   type: 'error',
        // });

        return '';
      }

      // TODO: flash({
      //   title: e.name,
      //   contents: e.message,
      //   type: 'error',
      // });

      return '';
    }) || [];

  return [login, { data, loading, errorMessages }];
};
