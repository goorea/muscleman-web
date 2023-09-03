import { Close as CloseIcon, Check as CheckIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import Loader from '@src/components/Loader';

import useVerify from './hooks/useVerify';

const EmailVerifyScreen: React.FC = () => {
  const { isLoading, isSuccess } = useVerify();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ mb: 1, bgcolor: isSuccess ? 'primary.main' : 'error.main' }}
          >
            {isSuccess ? (
              <CheckIcon fontSize="small" />
            ) : (
              <CloseIcon fontSize="small" />
            )}
          </Avatar>
          <Typography variant="h6">
            {isSuccess
              ? '이메일이 인증 되었습니다!'
              : '이메일 인증에 실패했습니다..'}
          </Typography>
        </Box>

        <Divider sx={{ mt: 1, mb: 2 }} />

        <Typography variant="body2">
          {isSuccess
            ? '근육맨 서비스를 마음껏 즐겨보세요!'
            : '유효하지 않은 링크로 접속하신거 같아요.'}
          <br />
          도움이 필요하시다면{' '}
          <Link href="mailto:muscleman@muscleman.kr">여기</Link>
          로 메일을 보내주세요. <br />
          최대한 빠르게 도움을 드릴 수 있도록 노력하겠습니다!!! 💪
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            to="/"
            variant="contained"
            color={isSuccess ? 'primary' : 'error'}
            sx={{ mx: 'auto' }}
            component={ReactRouterLink}
          >
            홈으로 돌아가기
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EmailVerifyScreen;
