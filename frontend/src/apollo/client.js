import {ApolloClient, InMemoryCache, createHttpLink, from} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {onError} from "@apollo/client/link/error";
import store from "../redux/store";
import {enqueueToast} from "../redux/Notifier";
import {ToastTypes} from "../constants";
import {logoutUser} from "../redux/User";

const httpLink = createHttpLink({
    uri: 'http://localhost/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    console.log('Caught GraphQL error', {graphQLErrors, networkError});

    if (graphQLErrors){
        if(graphQLErrors[0].extensions.code === 'NOT_AUTHENTICATED'){
            store.dispatch(enqueueToast({
                message: graphQLErrors[0].message,
                type: ToastTypes.Error,
            }));

            store.dispatch(logoutUser());
        }
        else {
            store.dispatch(enqueueToast({
                message: `Something went wrong: ${graphQLErrors[0].message}`,
                type: ToastTypes.Error,
            }));
        }
    }
});

const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache()
});

export {client};