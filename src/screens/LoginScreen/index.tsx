import {
  Apple as AppleIcon,
  LockOutlined as LockOutlinedIcon,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import GoogleIcon from '@src/components/GoogleIcon';
import KakaoIcon from '@src/components/KakaoIcon';
import NaverIcon from '@src/components/NaverIcon';
import { getDeviceID } from '@src/functions';
import { useLogin } from '@src/operations/mutations/login';
import useGoogleSignIn from '@src/screens/LoginScreen/hooks/useGoogleSignIn';
import useKakaoSignIn from '@src/screens/LoginScreen/hooks/useKakaoSignIn';

import useRules from './hooks/useRules';
import { SocialButtonGroup, SocialFab } from './styled';

export type LoginFormInput = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const [remember, setRemember] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const login = useLogin(remember, setErrorMessages);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>();
  const { emailRules, passwordRules } = useRules();
  const { googleSignIn } = useGoogleSignIn();
  const { kakaoSignIn } = useKakaoSignIn();

  const onSubmit = async (input: LoginFormInput) => {
    await login({
      variables: {
        input: {
          ...input,
          deviceID: getDeviceID(),
        },
      },
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRemember(event.target.checked);

  return (
    <Container data-testid="loginScreen" component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h5" variant="h5" sx={{ fontWeight: 'bold' }}>
          로그인
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            error={!!errors.email}
            margin="normal"
            fullWidth
            id="email"
            label="이메일"
            autoComplete="email"
            autoFocus
            helperText={errors.email?.message}
            {...register('email', emailRules)}
          />
          <TextField
            error={!!errors.password}
            margin="normal"
            fullWidth
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={errors.password?.message}
            {...register('password', passwordRules)}
          />
          {errorMessages.map(message => (
            <Typography
              key={message}
              color="error"
              variant="body2"
              gutterBottom={false}
            >
              {message}
            </Typography>
          ))}
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                color="primary"
                onChange={handleChange}
              />
            }
            label="로그인 기억하기"
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isSubmitting}
          >
            로그인
          </LoadingButton>

          <SocialButtonGroup sx={{ mt: 2 }}>
            <SocialFab
              data-testid="googleLogin"
              size="small"
              social="google"
              onClick={googleSignIn}
            >
              <GoogleIcon />
            </SocialFab>

            <SocialFab data-testid="appleLogin" size="small" social="apple">
              <AppleIcon sx={{ color: 'background.paper' }} />
            </SocialFab>

            <SocialFab data-testid="naverLogin" size="small" social="naver">
              <NaverIcon />
            </SocialFab>

            <SocialFab
              data-testid="kakaoLogin"
              size="small"
              social="kakao"
              onClick={kakaoSignIn}
            >
              <KakaoIcon />
            </SocialFab>
          </SocialButtonGroup>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginScreen;
