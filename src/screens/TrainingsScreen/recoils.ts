import { atom } from 'recoil';

import { Training } from '@src/types/graphql';

export const trainingsState = atom<Training[]>({
  key: 'trainingState',
  default: [],
});

export const editingTrainingState = atom<Training | null>({
  key: 'editingTrainingState',
  default: null,
});
