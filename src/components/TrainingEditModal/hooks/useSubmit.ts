import dayjs from 'dayjs';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { ToastProps } from '@src/components/Toast';
import { EditTrainingInput } from '@src/components/TrainingEditModal';
import { useUpdateTraining } from '@src/operations/mutations/updateTraining';
import { toastsState } from '@src/recoils';
import {
  editingTrainingState,
  trainingsState,
} from '@src/screens/TrainingsScreen/recoils';
import { Training } from '@src/types/graphql';

const useSubmit = () => {
  const updateTraining = useUpdateTraining();
  const setTrainings = useSetRecoilState<Training[]>(trainingsState);
  const [editingTraining, setEditingTraining] = useRecoilState<Training | null>(
    editingTrainingState,
  );
  const setToast = useSetRecoilState<ToastProps[]>(toastsState);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const onSubmit = async (data: EditTrainingInput) => {
    await updateTraining({
      variables: {
        _id: editingTraining?._id,
        input: { ...data, preference: Number(data.preference) },
      },
      onCompleted: () => {
        setTrainings(prevTrainings =>
          prevTrainings.map(prevTraining =>
            prevTraining._id === editingTraining?._id
              ? {
                  ...prevTraining,
                  ...data,
                  updatedAt: dayjs().toISOString(),
                }
              : prevTraining,
          ),
        );
        setEditingTraining(null);
        setToast(prevState =>
          prevState.concat({
            message: '수정되었습니다.',
            severity: 'success',
          }),
        );
      },
      onError: error =>
        setErrorMessages(error?.graphQLErrors.map(e => e.message)),
    });
  };

  return { onSubmit, errorMessages };
};

export default useSubmit;
