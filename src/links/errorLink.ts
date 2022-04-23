import { ApolloClient, InMemoryCache, Observable } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ServerParseError } from '@apollo/client/link/http';
import { ServerError } from '@apollo/client/link/utils';

import { getDeviceID } from '@src/functions';
import { ERROR_CODES } from '@src/hooks/useErrorEffect';
import httpLink from '@src/links/httpLink';
import { REFRESH_TOKEN } from '@src/operations/mutations/refreshToken';
import { Mutation, MutationRefreshTokenArgs } from '@src/types/graphql';

const isServerError = (
  error: Error | ServerError | ServerParseError,
): error is ServerError => (error as ServerError).result !== undefined;

const errorLink = onError(({ networkError, operation, forward }) => {
  if (
    networkError &&
    isServerError(networkError) &&
    networkError.result.errors[0].extensions.code ===
      ERROR_CODES.TOKEN_EXPIRED_ERROR
  ) {
    return new Observable(subscriber => {
      (async () => {
        try {
          const refreshToken = localStorage.getItem('@refreshToken');

          if (!refreshToken) {
            localStorage.removeItem('@token');
            localStorage.removeItem('@refreshToken');
            throw new Error('리플래쉬 토큰이 없습니다.');
          }

          const client = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
          });

          const { data } = await client.mutate<
            Pick<Mutation, 'refreshToken'>,
            MutationRefreshTokenArgs
          >({
            mutation: REFRESH_TOKEN,
            variables: { refreshToken, deviceID: getDeviceID() },
          });

          if (!data) {
            localStorage.removeItem('@token');
            localStorage.removeItem('@refreshToken');
            throw new Error('올바르지 않은 요청입니다.');
          }

          const { token, refreshToken: refreshed_token } = data.refreshToken;

          localStorage.setItem('@token', token);
          localStorage.setItem('@refreshToken', refreshed_token);

          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : '',
            },
          }));

          forward(operation).subscribe({
            next: subscriber.next.bind(subscriber),
            error: subscriber.error.bind(subscriber),
            complete: subscriber.complete.bind(subscriber),
          });
        } catch (error) {
          subscriber.error(error);
        }
      })();
    });
  }
});

export default errorLink;
