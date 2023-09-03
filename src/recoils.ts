import { atom, selector } from 'recoil';

import client from '@src/client';
import { ToastProps } from '@src/components/Toast';
import { ME } from '@src/operations/queries/me';
import { Query, User } from '@src/types/graphql';

export const JWTTokenState = atom<string | null>({
  key: 'JWTTokenState',
  default: localStorage.getItem('@token'),
});

export const userSelector = selector<User | null>({
  key: 'userSelector',
  get: async ({ get }) => {
    const JWTToken = get(JWTTokenState) || sessionStorage.getItem('@token');

    if (JWTToken) {
      sessionStorage.setItem('@token', JWTToken);

      const { data } = await client.query<Pick<Query, 'me'>>({
        query: ME,
      });

      return data.me;
    }

    return null;
  },
});

export const toastsState = atom<ToastProps[]>({
  key: 'toastsState',
  default: [],
});
