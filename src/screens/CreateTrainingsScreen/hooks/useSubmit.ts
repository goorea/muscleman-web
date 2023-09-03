import { MutableRefObject, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { CreateTrainingCardElement } from '@src/components/CreateTrainingCard';
import { ToastProps } from '@src/components/Toast';
import { useMultipleCreateTrainings } from '@src/operations/mutations/multipleCreateTrainings';
import { TRAININGS } from '@src/operations/queries/trainings';
import { toastsState } from '@src/recoils';
import { trainingsState } from '@src/screens/TrainingsScreen/recoils';
import { CreateTrainingInput, Training } from '@src/types/graphql';

const useSubmit = (cardRefs: MutableRefObject<CreateTrainingCardElement[]>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const setTrainings = useSetRecoilState<Training[]>(trainingsState);
  const setToast = useSetRecoilState<ToastProps[]>(toastsState);
  const multipleCreateTrainings = useMultipleCreateTrainings();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    const inputs: CreateTrainingInput[] = [];
    let isInvalid = false;

    for (const cardRef of cardRefs.current) {
      await cardRef.onSubmit(
        data => inputs.push(data),
        () => (isInvalid = true),
      );

      if (isInvalid) {
        break;
      }
    }

    if (!isInvalid) {
      await multipleCreateTrainings({
        variables: {
          inputs,
        },
        onCompleted: ({ multipleCreateTrainings }) => {
          setTrainings(prevTrainings =>
            prevTrainings.concat(multipleCreateTrainings),
          );
          setToast(prevState =>
            prevState.concat({
              message: '저장되었습니다.',
              severity: 'success',
            }),
          );
          navigate('/trainings');
        },
        onError: error =>
          setToast(prevState =>
            prevState.concat(
              error?.graphQLErrors.map(e => ({
                message: e.message,
                severity: 'error',
              })),
            ),
          ),
        refetchQueries: [{ query: TRAININGS }],
      });
    }

    setLoading(false);
  };

  return {
    loading,
    handleSubmit,
  };
};

export default useSubmit;
