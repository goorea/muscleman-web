import 'cross-fetch/polyfill';
import { ApolloClient, from, InMemoryCache } from '@apollo/client';

import authLink from '@src/links/authLink';
import errorLink from '@src/links/errorLink';
import httpLink from '@src/links/httpLink';

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  name: process.env.REACT_APP_CRYPTO_KEY,
  version: process.env.REACT_APP_APP_VERSION,
});

export default client;
