import React from 'react';

import GooglePlayStoreIcon from '@src/assets/images/google-play-icon.webp';

const GooglePlayIcon: React.FC = () => {
  return (
    <img
      src={GooglePlayStoreIcon}
      alt="구글 플레이 스토어"
      width={20}
      height={20}
    />
  );
};

export default GooglePlayIcon;
