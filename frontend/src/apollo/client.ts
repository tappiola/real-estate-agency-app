import {
    ApolloClient, InMemoryCache, createHttpLink, from
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: '/graphql'
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

const client = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache()
});

export default client;
