import { RegisterOptions } from 'react-hook-form';

import { LoginFormInput } from '@src/screens/LoginScreen';

const useRules = (): {
  emailRules: RegisterOptions<LoginFormInput, 'email'>;
  passwordRules: RegisterOptions<LoginFormInput, 'password'>;
} => ({
  emailRules: {
    required: '이메일을 입력해주세요',
    pattern: {
      value:
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
      message: '이메일 형식이 아닙니다',
    },
  },
  passwordRules: {
    required: '비밀번호를 입력해주세요',
    minLength: {
      value: 8,
      message: '8글자보다 적습니다',
    },
  },
});

export default useRules;
