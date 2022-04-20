import { Gender, Role, User } from '@src/types/graphql';

export const useMockUser = (): Partial<User> => ({
  _id: '6228b9f4933d01e80dbdffd0',
  name: '정형석',
  email: 'jhs851@naver.com',
  nickname: '정형석',
  gender: Gender.Male,
  roles: [Role.Verified, Role.Admin],
});

export default useMockUser;
