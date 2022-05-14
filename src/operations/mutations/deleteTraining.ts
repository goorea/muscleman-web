import { gql, useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import {
  MutationFunctionOptions,
  MutationResult,
} from '@apollo/client/react/types/types';

import useErrorEffect from '@src/hooks/useErrorEffect';
import { Mutation, MutationDeleteTrainingArgs } from '@src/types/graphql';

export const DELETE_TRAINING = gql`
  mutation deleteTraining($_id: ObjectId!) {
    deleteTraining(_id: $_id)
  }
`;

export const useDeleteTraining = (): [
  (
    options?: MutationFunctionOptions<
      Pick<Mutation, 'deleteTraining'>,
      MutationDeleteTrainingArgs
    >,
  ) => Promise<FetchResult<Pick<Mutation, 'deleteTraining'>>>,
  Pick<MutationResult<Pick<Mutation, 'deleteTraining'>>, 'loading'>,
] => {
  const [deleteTraining, { loading, error }] = useMutation<
    Pick<Mutation, 'deleteTraining'>,
    MutationDeleteTrainingArgs
  >(DELETE_TRAINING);

  useErrorEffect(error);

  return [deleteTraining, { loading }];
};
