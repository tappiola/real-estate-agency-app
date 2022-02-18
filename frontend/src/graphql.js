export const sendGraphqlRequest = (graphqlQuery) => {

    const authToken = localStorage.getItem('token');
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
    // TODO rewrite
    return localStorage.getItem('token');
}