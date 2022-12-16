import { ApolloClient, InMemoryCache } from '@apollo/client';

export const serverClient = new ApolloClient({
  uri: `${process.env.API_BASE_URL}`,
  cache: new InMemoryCache(),
});

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  cache: new InMemoryCache(),
});

export default client;
