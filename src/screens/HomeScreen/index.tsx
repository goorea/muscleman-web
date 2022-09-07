import AppleIcon from '@mui/icons-material/Apple';
import { Button, Container, Fade, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Footer from '@src/components/Footer';
import GooglePlayIcon from '@src/components/GooglePlayIcon';
import Header from '@src/components/Header';

import { BackgroundContainer } from './styled';

const HomeScreen: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 1000);
  }, []);

  return (
    <>
      <Header />
      <BackgroundContainer>
        <Fade in={visible} timeout={1000}>
          <Container maxWidth="lg" sx={{ textAlign: 'center', pt: '170px' }}>
            <Typography
              variant="h2"
              color="common.black"
              gutterBottom
              sx={{ lineHeight: 1.4, fontWeight: 700 }}
            >
              근육맨 어플을 통해 <br />
              나만의 운동 계획을 세우고 <br />
              근육맨이 되어보아요 !
            </Typography>
            <Button
              variant="contained"
              color="info"
              href="https://apps.apple.com/us/app/%EA%B7%BC%EC%9C%A1%EB%A7%A8/id1590126894"
              target="_blank"
              startIcon={<AppleIcon />}
              sx={{ px: 4, py: 2, textTransform: 'none' }}
            >
              App Store
            </Button>
            <Button
              variant="contained"
              color="info"
              href="#"
              startIcon={<GooglePlayIcon />}
              sx={{ pl: 3, pr: 4, py: 2, ml: 1, textTransform: 'none' }}
            >
              Google Play
            </Button>
          </Container>
        </Fade>
      </BackgroundContainer>
      <Footer />
    </>
  );
};

export default HomeScreen;
