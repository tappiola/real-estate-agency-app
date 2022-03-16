import jwt_decode from 'jwt-decode';
import { HOST } from '../constants';
import { getSavedToken } from '../util';
import { GraphqlResponse, JwtDecodeResult } from './types';

export const getToken = () => {
    let authToken = getSavedToken();

    if (authToken && authToken !== 'null') {
        const decodedToken = jwt_decode<JwtDecodeResult>(authToken);

        // If token has expired, there is no sense to pass it to server
        // Ideally, we should have token refresh flow here
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            authToken = null;
            localStorage.removeItem('token');
        }
    }

    return authToken;
};

export const sendGraphqlRequest = async <T>(query: string, variables = {}): Promise<T> => {
    const authToken = getToken();

    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    if (authToken) {
        headers.set('Authorization', `Bearer ${authToken}`);
    }

    const response = await fetch(`${HOST}/graphql`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables
        })
    });

    const { data, errors }: GraphqlResponse<T> = await response.json();

    if (errors || !data) {
        // return Promise.reject(new Error((errors && errors[0].message) ?? 'Something went wrong'));
        throw new Error((errors && errors[0].message) ?? 'Something went wrong');
    }

    return Promise.resolve<T>(data);
};