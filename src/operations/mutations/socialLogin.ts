import { gql, useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions, MutationResult } from '@apollo/client/react';

import { AUTHENTICATION_RESPONSE_FIELDS } from '@src/fragments/user';
import useErrorEffect from '@src/hooks/useErrorEffect';
import { Mutation, MutationSocialLoginArgs } from '@src/types/graphql';

export const SOCIAL_LOGIN = gql`
  ${AUTHENTICATION_RESPONSE_FIELDS}
  mutation socialLogin($input: SocialLoginInput!) {
    socialLogin(input: $input) {
      ...AuthenticationResponseFields
    }
  }
`;

export const useSocialLoginMutation = (): [
  (
    options?: MutationFunctionOptions<
      Pick<Mutation, 'socialLogin'>,
      MutationSocialLoginArgs
    >,
  ) => Promise<FetchResult<Pick<Mutation, 'socialLogin'>>>,
  Pick<MutationResult<Pick<Mutation, 'socialLogin'>>, 'data' | 'loading'>,
] => {
  const [socialLogin, { data, error, loading }] = useMutation<
    Pick<Mutation, 'socialLogin'>,
    MutationSocialLoginArgs
  >(SOCIAL_LOGIN);

  useErrorEffect(error);

  return [socialLogin, { data, loading }];
};
