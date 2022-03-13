import {
    ApolloClient, InMemoryCache, createHttpLink, from
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { HOST } from '../constants';

const httpLink = createHttpLink({
    uri: `${HOST}/graphql`
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');

    const authorization = token ? { authorization: `Bearer ${token}` } : {};

    return {
        headers: {
            ...headers,
            ...authorization
        }
    };
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    // eslint-disable-next-line no-console
    console.log('Caught GraphQL error', { operation, graphQLErrors, networkError });
});

const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache()
});

export default client;
