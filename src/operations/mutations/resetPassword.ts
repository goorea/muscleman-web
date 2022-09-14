import { gql, useMutation } from '@apollo/client';
import { Dispatch, SetStateAction } from 'react';
import { useSetRecoilState } from 'recoil';

import { AUTHENTICATION_RESPONSE_FIELDS } from '@src/fragments/user';
import { toastsState } from '@src/recoils';
import { Mutation, MutationChangePasswordArgs } from '@src/types/graphql';

export const CHANGE_PASSWORD = gql`
  ${AUTHENTICATION_RESPONSE_FIELDS}
  mutation changePassword($password: String!, $token: String!) {
    changePassword(password: $password, token: $token)
  }
`;

const useChangePassword = (
  setErrorMessages: Dispatch<SetStateAction<string[]>>,
) => {
  const setToast = useSetRecoilState(toastsState);
  const [changePassword] = useMutation<
    Pick<Mutation, 'changePassword'>,
    MutationChangePasswordArgs
  >(CHANGE_PASSWORD, {
    onError: error => {
      setErrorMessages(
        error?.graphQLErrors
          .map(e => {
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
  });

  return changePassword;
};

export default useChangePassword;
