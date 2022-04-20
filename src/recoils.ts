import { atom } from 'recoil';

import { User } from '@src/types/graphql';

export const userState = atom<User | undefined>({
  key: 'userState',
  default: undefined,
});
