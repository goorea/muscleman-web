import { createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_APP_API_URI,
});

export default httpLink;
