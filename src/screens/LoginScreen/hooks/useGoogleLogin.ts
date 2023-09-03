import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin as useGoogleSignin,
} from 'react-google-login';

import { getDeviceID } from '@src/functions';
import { useSocialLoginMutation } from '@src/operations/mutations/socialLogin';
import { SocialProvider } from '@src/types/graphql';

const useGoogleLogin = () => {
  const [socialLogin] = useSocialLoginMutation();

  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ): void => {
    const isGoogleLoginResponse = (
      response: GoogleLoginResponse | GoogleLoginResponseOffline,
    ): response is GoogleLoginResponse =>
      (response as GoogleLoginResponse).profileObj !== undefined;

    if (isGoogleLoginResponse(response)) {
      socialLogin({
        variables: {
          input: {
            name: response.profileObj.name,
            email: response.profileObj.email,
            provider: SocialProvider.Google,
            deviceID: getDeviceID(),
          },
        },
      });
    }
  };

  const { signIn } = useGoogleSignin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess,
  });

  const googleLogin = () => {
    signIn();
  };

  return {
    googleLogin,
  };
};

export default useGoogleLogin;
