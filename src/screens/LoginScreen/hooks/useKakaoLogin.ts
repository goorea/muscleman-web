import { useSetRecoilState } from 'recoil';

import { ToastProps } from '@src/components/Toast';
import { getDeviceID } from '@src/functions';
import { useSocialLoginMutation } from '@src/operations/mutations/socialLogin';
import { toastsState } from '@src/recoils';
import {
  CustomWindow,
  KakaoError,
  UserProfile,
} from '@src/screens/LoginScreen/types';
import { SocialProvider } from '@src/types/graphql';

declare let window: CustomWindow;

const useKakaoLogin = () => {
  const [socialLogin] = useSocialLoginMutation();
  const setToast = useSetRecoilState<ToastProps[]>(toastsState);

  const loadKakaoSdk = () => {
    return new Promise(resolve => {
      const js: HTMLScriptElement = document.createElement('script');

      js.id = 'kakao-sdk';
      js.src = '//developers.kakao.com/sdk/js/kakao.min.js';
      js.onload = resolve;

      document.body.append(js);
    });
  };

  const kakaoLogin = async () => {
    await loadKakaoSdk();

    window.Kakao?.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);

    window.Kakao?.Auth.login({
      throughTalk: true,
      persistAccessToken: true,
      success: () => {
        window.Kakao?.API.request({
          url: '/v2/user/me',
          success: ({ kakao_account: kakaoAcount }: UserProfile): void => {
            socialLogin({
              variables: {
                input: {
                  name: kakaoAcount.profile.nickname,
                  email: kakaoAcount.email,
                  provider: SocialProvider.Kakao,
                  deviceID: getDeviceID(),
                },
              },
            });
          },
          fail: (e: KakaoError) => {
            setToast(prevState =>
              prevState.concat({
                message: e.error,
                severity: 'error',
              }),
            );
          },
        });
      },
      fail: (f: KakaoError) => {
        setToast(prevState =>
          prevState.concat({
            message: `카카오 로그인에 실패했습니다. (${f.error})`,
            severity: 'error',
          }),
        );
      },
    });
  };
  return { kakaoLogin };
};

export default useKakaoLogin;
