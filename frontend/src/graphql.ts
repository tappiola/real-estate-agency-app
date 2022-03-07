import jwt_decode from "jwt-decode";
import {HOST} from "./constants";

type JwtDecodeResult = {
    exp: number,
}

export const getToken = () => {
    let authToken = localStorage.getItem('token');

    if(authToken) {
        try {
            const decodedToken = jwt_decode<JwtDecodeResult>(authToken);

            // If token has expired, there is no sense to pass it to server
            // Ideally, we should have token refresh flow here
            if(decodedToken.exp * 1000 < new Date().getTime()){
                throw Error('Auth token has expired');
            }
        }
        catch(e){
            authToken = null;
            localStorage.removeItem('token');
        }
    }

    return authToken;
}

type SendGraphqlParams = {
    query: string;
}

export const sendGraphqlRequest = (graphqlQuery: SendGraphqlParams) => {
    const authToken = getToken();

    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    if(authToken){
        headers.set('Authorization', 'Bearer ' + authToken);
    }

    return fetch(HOST + '/graphql', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(graphqlQuery)
    })
}

export const isAuthorized = () => {
    return localStorage.getItem('token');
}
