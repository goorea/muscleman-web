import { Dispatch, SetStateAction } from 'react';
import { useSetRecoilState } from 'recoil';

import { useDeleteTraining } from '@src/operations/mutations/deleteTraining';
import { TRAININGS } from '@src/operations/queries/trainings';
import {
  editingTrainingState,
  trainingsState,
} from '@src/screens/TrainingsScreen/recoils';
import { Training } from '@src/types/graphql';

const useEvents = (
  selected: string[],
  setSelected: Dispatch<SetStateAction<string[]>>,
) => {
  const [deleteTraining] = useDeleteTraining();
  const setTrainings = useSetRecoilState<Training[]>(trainingsState);
  const setEditingTraining = useSetRecoilState<Training | null>(
    editingTrainingState,
  );

  const handleEdit = (training: Training) => setEditingTraining(training);

  const handleDelete = async () => {
    await Promise.all(
      selected.map(_id =>
        deleteTraining({
          variables: {
            _id,
          },
          refetchQueries: [{ query: TRAININGS }],
        }),
      ),
    );
    setTrainings(prevTrainings =>
      prevTrainings.filter(({ _id }) => !selected.includes(_id)),
    );
    setSelected([]);
  };

  return {
    handleEdit,
    handleDelete,
  };
};

export default useEvents;
