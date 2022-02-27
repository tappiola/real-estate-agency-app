import jwt_decode from "jwt-decode";

export const getToken = () => {
    let authToken = localStorage.getItem('token');

    if(authToken) {
        try {
            const decodedToken = jwt_decode(authToken);
            console.log({decodedToken});

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

export const sendGraphqlRequest = (graphqlQuery, requiresAuth = false) => {
    const authToken = getToken();

    const authHeader = authToken ? {Authorization: 'Bearer ' + authToken} : {};

    return fetch('http://localhost/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
        body: JSON.stringify(graphqlQuery)
    })
}

export const isAuthorized = () => {
    return localStorage.getItem('token');
}
