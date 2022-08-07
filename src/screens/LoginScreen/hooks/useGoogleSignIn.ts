import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from 'react-google-login';

import { getDeviceID } from '@src/functions';
import { useSocialLoginMutation } from '@src/operations/mutations/socialLogin';
import { SocialProvider } from '@src/types/graphql';

const useGoogleSignIn = () => {
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

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess,
  });

  const googleSignIn = () => {
    signIn();
  };

  return {
    googleSignIn,
  };
};

export default useGoogleSignIn;
