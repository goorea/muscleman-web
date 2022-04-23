import Base64 from 'crypto-js/enc-base64';
import hmacSHA512 from 'crypto-js/hmac-sha512';

export const getDeviceID = (): string =>
  process.env.NODE_ENV === 'test'
    ? 'test'
    : Base64.stringify(
        hmacSHA512(
          `${navigator.userAgent}_${new Date().getTime()}`,
          process.env.REACT_APP_CRYPTO_KEY,
        ),
      ).substring(0, 32);
