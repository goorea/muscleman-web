const useRules = () => ({
  nameRules: {
    required: '이름을 입력해주세요',
  },
  categoryRules: {
    required: '카테고리를 선택해주세요',
  },
  typeRules: {
    required: '타입을 선택해주세요',
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
    valueAsNumber: true,
    setValueAs: (value: string) => Number(value),
  },
  thumbnailPathRules: {},
  videoPathRules: {},
});

export default useRules;
