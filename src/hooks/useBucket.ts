import AWS from 'aws-sdk';
import { ChangeEvent, useState } from 'react';
import { Path } from 'react-hook-form';
import {
  UnpackNestedValue,
  UseFormSetValue,
} from 'react-hook-form/dist/types/form';
import { PathValue } from 'react-hook-form/dist/types/path';
import { useSetRecoilState } from 'recoil';

import { ToastProps } from '@src/components/Toast';
import { toastsState } from '@src/recoils';
import { CreateTrainingInput, UpdateTrainingInput } from '@src/types/graphql';

type TrainingInput = CreateTrainingInput | UpdateTrainingInput;

const useBucket = <T extends TrainingInput>(
  name: string,
  setValue: UseFormSetValue<T>,
) => {
  const region = 'ap-northeast-2';
  const bucket = 'muscleman-assets';

  const [loading, setLoading] = useState<boolean>(false);
  const setToast = useSetRecoilState<ToastProps[]>(toastsState);

  AWS.config.update({
    region,
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    },
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length) {
      const file = target.files[0];

      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: bucket,
          Key: file.name,
          Body: file,
        },
      });

      setLoading(true);
      upload
        .promise()
        .then(response => {
          if (response) {
            setValue(
              name as Path<T>,
              response.Location as UnpackNestedValue<PathValue<T, Path<T>>>,
            );
          }
        })
        .catch(error => {
          setToast(prevState =>
            prevState.concat({
              message: `파일을 업로드 하는데 실패했습니다. (${error})`,
              severity: 'error',
            }),
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return { handleFileInput, loading };
};

export default useBucket;
