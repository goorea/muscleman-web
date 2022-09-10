import { gql } from '@apollo/client';

export const VERIFY = gql`
  mutation verify($token: String!) {
    verify(token: $token)
  }
`;
