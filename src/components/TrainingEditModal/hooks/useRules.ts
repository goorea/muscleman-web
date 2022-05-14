import { RegisterOptions } from 'react-hook-form';

import { EditTrainingInput } from '@src/components/TrainingEditModal';
import { TrainingCategory, TrainingType } from '@src/types/graphql';

const useRules = (): {
  nameRules: RegisterOptions<EditTrainingInput, 'name'>;
  categoryRules: RegisterOptions<EditTrainingInput, 'category'>;
  typeRules: RegisterOptions<EditTrainingInput, 'type'>;
  descriptionRules: RegisterOptions<EditTrainingInput, 'description'>;
  preferenceRules: RegisterOptions<EditTrainingInput, 'preference'>;
  thumbnailPathRules: RegisterOptions<EditTrainingInput, 'thumbnailPath'>;
  videoPathRules: RegisterOptions<EditTrainingInput, 'videoPath'>;
} => ({
  nameRules: {
    required: '이름을 입력해주세요',
  },
  categoryRules: {
    required: '카테고리를 선택해주세요',
    validate: value =>
      Object.values(TrainingCategory).includes(value) ||
      '유효한 카테고리가 아닙니다,',
  },
  typeRules: {
    required: '타입을 선택해주세요',
    validate: value =>
      Object.values(TrainingType).includes(value) || '유효한 타입이 아닙니다,',
  },
  descriptionRules: {},
  preferenceRules: {
    required: '선호도를 입력해주세요',
    min: {
      value: 1,
      message: '선호도는 1이상이어야 합니다',
    },
    max: {
      value: 10,
      message: '선호도는 10이하이어야 합니다',
    },
  },
  thumbnailPathRules: {},
  videoPathRules: {},
});

export default useRules;
