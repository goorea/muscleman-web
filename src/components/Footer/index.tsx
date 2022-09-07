import { Container, Link, Typography } from '@mui/material';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const Footer: React.FC = () => (
  <Container maxWidth="md" sx={{ pt: 3, pb: 6 }}>
    <Typography variant="subtitle2" sx={{ color: 'grey.600' }}>
      <span style={{ fontWeight: 700 }}>대표</span> 정형석, 김지연
    </Typography>
    <Typography variant="subtitle2" sx={{ color: 'grey.600' }}>
      <span style={{ fontWeight: 700 }}>주소</span> 경기도 의정부시 서광로 166
    </Typography>
    <Typography variant="subtitle2" sx={{ color: 'grey.600' }}>
      <span style={{ fontWeight: 700 }}>전화</span>{' '}
      <Link href="tel:010-2414-8641" color="inherit">
        010-2414-8641
      </Link>{' '}
      | <span style={{ fontWeight: 700 }}>고객문의</span>{' '}
      <Link href="mailto:muscleman@muscleman.kr" color="inherit">
        muscleman@muscleman.kr
      </Link>
    </Typography>

    <Typography variant="subtitle2" sx={{ mt: 3, color: 'grey.600' }}>
      <Link to="/terms" color="inherit" component={ReactRouterLink}>
        이용약관
      </Link>
      <Link
        to="/privacy"
        color="inherit"
        component={ReactRouterLink}
        sx={{ ml: 2, fontWeight: 700 }}
      >
        개인정보처리방침
      </Link>
    </Typography>
  </Container>
);

export default Footer;
