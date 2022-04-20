import 'cross-fetch/polyfill';
import { ApolloClient, from, InMemoryCache } from '@apollo/client';

import authLink from '@src/links/authLink';
import httpLink from '@src/links/httpLink';

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  name: import.meta.env.SNOWPACK_PUBLIC_APP_NAME,
  version: import.meta.env.APP_VERSION,
});

export default client;
