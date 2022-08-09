import $ from 'jquery';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { getDeviceID } from '@src/functions';
import { useSocialLoginMutation } from '@src/operations/mutations/socialLogin';
import { SocialProvider } from '@src/types/graphql';

import { NaverAccount } from '../types';

interface Params {
  [key: string]: string;
}

const useNaverLogin = () => {
  const authorizeUrl = 'https://nid.naver.com/oauth2.0/authorize';
  const [socialLogin] = useSocialLoginMutation();
  const { hash } = useLocation();

  const accessToken = useMemo(() => {
    const params: Params = {};
    const queryString = (hash + '').substring(1);
    const regex = /([^#?&=]+)=([^&]*)/g;
    let match;

    while ((match = regex.exec(queryString)) !== null) {
      params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
    }

    return params.access_token;
  }, [hash]);

  useEffect(() => {
    if (accessToken) {
      (async () => {
        const response: NaverAccount = await new Promise(resolve => {
          $.ajax({
            url: 'https://openapi.naver.com/v1/nid/getUserProfile.json?response_type=json',
            type: 'GET',
            data: { access_token: accessToken },
            dataType: 'jsonp',
            jsonp: 'oauth_callback',
            success: ({ response }) => {
              resolve(response);
            },
          });
        });

        console.log('hey', response);

        socialLogin({
          variables: {
            input: {
              name: response.name,
              email: response.email,
              provider: SocialProvider.Naver,
              deviceID: getDeviceID(),
            },
          },
        });
      })();
    }
  }, [accessToken, socialLogin]);

  const getNaverLoginLink = () => {
    return `${authorizeUrl}?response_type=token&client_id=${
      process.env.REACT_APP_NAVER_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      process.env.REACT_APP_NAVER_CALLBACK_URL,
    )}`;
  };

  return { getNaverLoginLink };
};

export default useNaverLogin;
