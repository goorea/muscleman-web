/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_APP_NAME: string;
    readonly REACT_APP_APP_VERSION: string;
    readonly REACT_APP_APP_API_URI: string;
    readonly REACT_APP_CRYPTO_KEY;
    string;
  }
}
