/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_APP_NAME: string;
    readonly REACT_APP_APP_VERSION: string;
    readonly REACT_APP_APP_API_URI: string;
    readonly REACT_APP_CRYPTO_KEY: string;
    readonly REACT_APP_GOOGLE_CLIENT_ID: string;
    readonly REACT_APP_KAKAO_JAVASCRIPT_KEY: string;
    readonly REACT_APP_SENTRY_DSN: string;
  }
}
