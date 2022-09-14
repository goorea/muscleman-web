import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import useChangePassword from '@src/operations/mutations/resetPassword';
import usePasswordRules from '@src/screens/ChangePasswordScreen/hooks/usePasswordRules';

export type ChangePasswordFormInput = {
  password: string;
  passwordConfirmation: string;
};

const ChangePasswordScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ChangePasswordFormInput>();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const changePassword = useChangePassword(setErrorMessages);

  const validatePassword = (): boolean => {
    return getValues('password') === getValues('passwordConfirmation');
  };

  const { passwordRules, passwordConfirmationRules } =
    usePasswordRules(validatePassword);
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = async ({ password }: ChangePasswordFormInput) => {
    await changePassword({
      variables: {
        token: searchParams.get('token') || '',
        password,
      },
    });
  };

  return (
    <Container data-testid="loginScreen" component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h5" variant="h5" sx={{ fontWeight: 'bold' }}>
          비밀번호 변경
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            error={!!errors.password}
            margin="normal"
            fullWidth
            id="password"
            label="비밀번호"
            type="password"
            autoComplete="new-password"
            autoFocus
            helperText={errors.password?.message}
            {...register('password', passwordRules)}
          />
          <TextField
            error={!!errors.passwordConfirmation}
            margin="normal"
            fullWidth
            label="비밀번호 확인"
            type="password"
            id="password-confirmation"
            autoComplete="new-password"
            helperText={errors.passwordConfirmation?.message}
            {...register('passwordConfirmation', passwordConfirmationRules)}
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

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isSubmitting}
          >
            비밀번호 변경
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePasswordScreen;
