import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useTrainings } from '@src/operations/queries/trainings';
import { trainingsState } from '@src/screens/TrainingsScreen/recoils';
import { Training } from '@src/types/graphql';

const useFetch = () => {
  const { data, loading } = useTrainings();
  const [trainings, setTrainings] = useRecoilState<Training[]>(trainingsState);

  useEffect(() => {
    if (data) {
      setTrainings(data.trainings);
    }
  }, [data, setTrainings]);

  return {
    loading,
    trainings,
  };
};

export default useFetch;
