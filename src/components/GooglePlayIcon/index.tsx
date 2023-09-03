import React from 'react';

import GooglePlayStoreIcon from '@src/assets/images/google-play-icon.png';

const GooglePlayIcon: React.FC = () => {
  return (
    <img
      data-testid="googlePlayIcon"
      src={GooglePlayStoreIcon}
      alt="구글 플레이 스토어"
      width={24}
      height={24}
    />
  );
};

export default GooglePlayIcon;
