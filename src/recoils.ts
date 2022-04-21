import { atom } from 'recoil';

import { ToastProps } from '@src/components/Toast';
import { Gender, Role, User } from '@src/types/graphql';

export const userState = atom<Partial<User> | null>({
  key: 'userState',
  default: {
    _id: '6228b9f4933d01e80dbdffd0',
    name: '정형석',
    email: 'jhs851@naver.com',
    nickname: '정형석',
    gender: Gender.Male,
    roles: [Role.Verified, Role.Admin],
  },
});

export const toastsState = atom<ToastProps[]>({
  key: 'toastsState',
  default: [],
});
