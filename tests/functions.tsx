import { MockedProvider } from '@apollo/client/testing';
import faker from 'faker';
import { uniqueId } from 'lodash';
import React from 'react';
import { RecoilRoot } from 'recoil';

import ThemeProvider from '@src/contexts/ThemeProvider';
import { Gender, Role, User } from '@src/types/graphql';

export const wrapper: React.JSXElementConstructor<{
  children: React.ReactElement;
}> = ({ children }) => (
  <MockedProvider>
    <ThemeProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </ThemeProvider>
  </MockedProvider>
);

export const userFactory = (input?: Partial<User>): User => ({
  __typename: 'User',
  _id: uniqueId(),
  name: faker.name.lastName() + faker.name.firstName(),
  email: `${uniqueId('email')}@${faker.internet.email().split('@')[1]}`,
  nickname: uniqueId('nn'),
  password: faker.internet.password(8),
  gender: faker.random.arrayElement([Gender.Male, Gender.Female]),
  birth: faker.date
    .between(new Date(1900, 0, 1), new Date(new Date().getFullYear() - 8, 0, 1))
    .toISOString(),
  tel: faker.phone.phoneNumber('010-####-####'),
  roles: [Role.Admin, Role.Verified],
  profileImagePath: faker.image.imageUrl(64, 64),
  createdAt: faker.date.future().toISOString(),
  updatedAt: faker.date.future().toISOString(),
  ...input,
});
