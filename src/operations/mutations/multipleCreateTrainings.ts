import { gql, useMutation } from '@apollo/client';

import { TRAINING_FIELDS } from '@src/fragments/training';
import {
  Mutation,
  MutationMultipleCreateTrainingsArgs,
} from '@src/types/graphql';

export const MULTIPLE_CREATE_TRAININGS = gql`
  ${TRAINING_FIELDS}
  mutation multipleCreateTrainings($inputs: [CreateTrainingInput!]!) {
    multipleCreateTrainings(inputs: $inputs) {
      ...TrainingFields
    }
  }
`;

export const useMultipleCreateTrainings = () => {
  const [multipleCreateTrainings] = useMutation<
    Pick<Mutation, 'multipleCreateTrainings'>,
    MutationMultipleCreateTrainingsArgs
  >(MULTIPLE_CREATE_TRAININGS);

  return multipleCreateTrainings;
};
