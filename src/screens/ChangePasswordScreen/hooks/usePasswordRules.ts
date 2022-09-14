import { RegisterOptions } from 'react-hook-form';

import { ChangePasswordFormInput } from '@src/screens/ChangePasswordScreen';

const usePasswordRules = (
  validatePassword: () => boolean,
): {
  passwordRules: RegisterOptions<ChangePasswordFormInput, 'password'>;
  passwordConfirmationRules: RegisterOptions<
    ChangePasswordFormInput,
    'passwordConfirmation'
  >;
} => ({
  passwordRules: {
    required: '비밀번호를 입력해주세요',
    minLength: {
      value: 8,
      message: '8글자보다 적습니다',
    },
  },
  passwordConfirmationRules: {
    validate: validatePassword,
  },
});

export default usePasswordRules;
