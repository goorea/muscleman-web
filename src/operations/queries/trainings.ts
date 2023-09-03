import { gql, useQuery } from '@apollo/client';
import { QueryResult } from '@apollo/client/react/types/types';

import { TRAINING_FIELDS } from '@src/fragments/training';
import useErrorEffect from '@src/hooks/useErrorEffect';
import { Query } from '@src/types/graphql';

export const TRAININGS = gql`
  ${TRAINING_FIELDS}
  query trainings {
    trainings {
      ...TrainingFields
    }
  }
`;

export const useTrainings = (): Pick<
  QueryResult<Pick<Query, 'trainings'>>,
  'data' | 'loading'
> => {
  const { data, error, loading } =
    useQuery<Pick<Query, 'trainings'>>(TRAININGS);

  useErrorEffect(error);

  return { data, loading };
};
