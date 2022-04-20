import { gql } from '@apollo/client';

import { TRAINING_FIELDS } from '@src/fragments/training';

export const TRAININGS = gql`
  ${TRAINING_FIELDS}
  query trainings {
    trainings {
      ...TrainingFields
    }
  }
`;
