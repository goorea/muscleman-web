import { useMutation } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { VERIFY } from '@src/operations/mutations/verify';
import { Mutation, MutationVerifyArgs } from '@src/types/graphql';

const useVerify = () => {
  const [searchParams] = useSearchParams();
  const [verify, { data, error }] = useMutation<
    Pick<Mutation, 'verify'>,
    MutationVerifyArgs
  >(VERIFY);
  const [result, setResult] = useState<'success' | 'failed'>();
  const isSuccess = useMemo(() => result === 'success', [result]);

  useEffect(() => {
    (async () => {
      const token = searchParams.get('token');

      if (!token) {
        setResult('failed');
      } else {
        await verify({
          variables: {
            token,
          },
        });
      }
    })();
  }, [searchParams, verify]);

  useEffect(() => {
    if (data?.verify) {
      setResult('success');
    } else {
      setResult('failed');
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setResult('failed');
    }
  }, [error]);

  return {
    isLoading: result === undefined,
    isSuccess,
  };
};

export default useVerify;
