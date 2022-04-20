import { atom } from 'recoil';

export const userState = atom<undefined>({
  key: 'userState',
  default: undefined,
});
