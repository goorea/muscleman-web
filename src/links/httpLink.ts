import { createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: import.meta.env.APP_API_URI,
});

export default httpLink;
