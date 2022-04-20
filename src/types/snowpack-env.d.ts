interface ImportMeta {
  url: string;
  // TypeScript Bug: https://github.com/microsoft/TypeScript/issues/41468
  // When TS bug is fixed and ecosystem has upgraded, then it will be safe
  // to change `hot` to the more correct "possibly undefined" (hot?: ...).
  readonly hot: ImportMetaHot;
  readonly env: {
    readonly SNOWPACK_PUBLIC_API_URL: string;
    readonly MODE: string;
    readonly NODE_ENV: string;
    readonly SSR?: boolean | undefined;

    readonly APP_VERSION: string;
    readonly APP_DUBUG: boolean;
    readonly APP_API_URI: string;
    readonly SNOWPACK_PUBLIC_APP_NAME: string;
  };
}
