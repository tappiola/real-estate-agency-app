import compress from 'graphql-query-compress';
import { getAuthToken } from '../util';
import { GraphqlResponse } from './types';
import { GRAPHQL_PATH } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const sendGraphqlRequest = async <T>(query: string, variables = {}): Promise<T> => {
    const authToken = getAuthToken();

    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    if (authToken) {
        headers.set('Authorization', `Bearer ${authToken}`);
    }

    const response = await fetch(GRAPHQL_PATH, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query: compress(query),
            variables
        })
    });

    const { data, errors }: GraphqlResponse<T> = await response.json();

    if (errors || !data) {
        return Promise.reject(new Error((errors && errors[0].message) ?? 'Something went wrong'));
    }

    return Promise.resolve<T>(data);
};
