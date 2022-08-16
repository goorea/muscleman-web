import AWS from 'aws-sdk';
import { ChangeEvent } from 'react';

const useBucket = () => {
  const region = 'ap-northeast-2';
  const bucket = 'muscleman-assets';

  AWS.config.update({
    region,
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    },
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  return (event: ChangeEvent<HTMLInputElement>) => {
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

      upload.promise().then(r => console.log(r));
    }
  };
};

export default useBucket;
