import AppleIcon from '@mui/icons-material/Apple';
import { Button } from '@mui/material';
import React from 'react';

import Header from '@src/components/Header';

import {
  BackgroundContainer,
  HomeContainer,
  DownloadLink,
  MainDescription,
} from './styled';

const HomeScreen: React.FC = () => {
  return (
    <>
      <Header />
      <BackgroundContainer>
        <HomeContainer>
          <MainDescription variant="h3">
            근육맨 어플을 통해 <br />
            나만의 운동 계획을 세우고 <br />
            근육맨이 되어보아요 !
          </MainDescription>
          <DownloadLink
            href="https://apps.apple.com/us/app/%EA%B7%BC%EC%9C%A1%EB%A7%A8/id1590126894"
            underline="none"
            mt={3}
          >
            <Button variant="contained" color="info" startIcon={<AppleIcon />}>
              App Store
            </Button>
          </DownloadLink>
          {/*<Link href="" underline="none">*/}
          {/*  <Button variant="contained" color="info" startIcon={<GooglePlayIcon />}>*/}
          {/*    Google Play Store*/}
          {/*  </Button>*/}
          {/*</Link>*/}
        </HomeContainer>
      </BackgroundContainer>
    </>
  );
};

export default HomeScreen;
