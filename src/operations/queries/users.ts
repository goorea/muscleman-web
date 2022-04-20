import { gql } from '@apollo/client';

import { CORE_USER_FIELDS } from '@src/fragments/user';

export const USERS = gql`
  ${CORE_USER_FIELDS}
  query users {
    users {
      ...CoreUserFields
    }
  }
`;
