import { gql } from '@apollo/client';

import { CORE_USER_FIELDS } from '@src/fragments/user';

export const ME = gql`
  ${CORE_USER_FIELDS}
  query me {
    me {
      ...CoreUserFields
    }
  }
`;
