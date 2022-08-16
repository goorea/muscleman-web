interface KakaoLoginParams {
  throughTalk: boolean;
  persistAccessToken: boolean;
  success: () => void;
  fail: (kakaoError: KakaoError) => void;
}

interface KakaoRequestParams {
  url: string;
  success: (kakaoAccount: UserProfile) => void;
  fail: (kakaoError: KakaoError) => void;
}

export interface CustomWindow extends Window {
  Kakao?: {
    init: (clientKey: string) => void;
    Auth: {
      login: (loginParams: KakaoLoginParams) => void;
    };
    API: {
      request: (requestParams: KakaoRequestParams) => void;
    };
  };
}

interface Profile {
  nickname: string;
  profile_image: string;
  thumbnail_image_url: string;
  profile_needs_agreement?: boolean;
}

interface KakaoAccount {
  profile: Profile;
  email: string;
  age_range: string;
  birthday: string;
  birthyear: string;
  gender: 'female' | 'male';
  phone_number: string;
  ci: string;
}

export interface UserProfile {
  id: number;
  kakao_account: KakaoAccount;
  synched_at: string;
  connected_at: string;
  properties: Profile;
}

export interface KakaoError {
  error: string;
  error_description: string;
}

export interface NaverAccount {
  age?: string;
  birthday?: string;
  birthyear?: string;
  email: string;
  gender?: 'F' | 'M';
  id: string;
  mobile?: string;
  mobile_e164?: string;
  name: string;
  nickname?: string;
  profile_image?: string;
}
