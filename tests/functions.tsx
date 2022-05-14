import { MockedProvider } from '@apollo/client/testing';
import faker from 'faker';
import { uniqueId } from 'lodash';
import React from 'react';
import { RecoilRoot } from 'recoil';

import ThemeProvider from '@src/contexts/ThemeProvider';
import {
  CreateTrainingInput,
  Gender,
  Role,
  Training,
  TrainingCategory,
  TrainingType,
  User,
} from '@src/types/graphql';

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

export const trainingFactory = (
  input?: Partial<CreateTrainingInput>,
): Training => ({
  __typename: 'Training',
  _id: uniqueId(),
  name: uniqueId(),
  category: faker.random.arrayElement([
    TrainingCategory.Weight,
    TrainingCategory.Cardiovascular,
    TrainingCategory.Calisthenics,
  ]),
  type: faker.random.arrayElement([
    TrainingType.Lower,
    TrainingType.Chest,
    TrainingType.Back,
    TrainingType.Shoulder,
    TrainingType.Arm,
    TrainingType.Abdominal,
    TrainingType.Cardiovascular,
    TrainingType.Etc,
  ]),
  description: faker.random.words(),
  preference: faker.datatype.number({
    min: 1,
    max: 10,
  }),
  thumbnailPath: faker.image.imageUrl(64, 64),
  videoPath: faker.image.imageUrl(64, 64),
  createdAt: faker.date.future().toISOString(),
  updatedAt: faker.date.future().toISOString(),
  ...input,
});
