import Base64 from 'crypto-js/enc-base64';
import hmacSHA512 from 'crypto-js/hmac-sha512';

import { TrainingType, TrainingCategory } from '@src/types/graphql';

export const getDeviceID = (): string =>
  process.env.NODE_ENV === 'test'
    ? 'test'
    : Base64.stringify(
        hmacSHA512(
          `${navigator.userAgent}_${new Date().getTime()}`,
          process.env.REACT_APP_CRYPTO_KEY,
        ),
      ).substring(0, 32);

export const getTrainingTypeForKorean = (type: TrainingType): string => {
  switch (type) {
    case TrainingType.Lower:
      return '하체';
    case TrainingType.Chest:
      return '가슴';
    case TrainingType.Back:
      return '등';
    case TrainingType.Shoulder:
      return '어깨';
    case TrainingType.Arm:
      return '팔';
    case TrainingType.Abdominal:
      return '복근';
    case TrainingType.Cardiovascular:
      return '유산소';
    default:
      return '기타';
  }
};

export const getTrainingCategoryForKorean = (
  category: TrainingCategory,
): string => {
  switch (category) {
    case TrainingCategory.Weight:
      return '중량 운동';
    case TrainingCategory.Calisthenics:
      return '맨몸 운동';
    case TrainingCategory.Cardiovascular:
    default:
      return '유산소 운동';
  }
};
