import { gql, useMutation } from '@apollo/client';

import { Mutation, MutationUpdateTrainingArgs } from '@src/types/graphql';

export const UPDATE_TRAINING = gql`
  mutation updateTraining($_id: ObjectId!, $input: UpdateTrainingInput!) {
    updateTraining(_id: $_id, input: $input)
  }
`;

export const useUpdateTraining = () => {
  const [updateTraining] = useMutation<
    Pick<Mutation, 'updateTraining'>,
    MutationUpdateTrainingArgs
  >(UPDATE_TRAINING);

  return updateTraining;
};
