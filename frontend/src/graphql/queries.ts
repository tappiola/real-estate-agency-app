import { sendGraphqlRequest } from './client';
import {
    GetCitiesResponse, GetPropertyTypesResponse, LoginResult, RegistrationResult, RegistrationRequest
} from './types';

export const fetchCities = () => {
    const graphqlQuery = `
        query GetCities {
            getCities {
                id
                name
            }
        }`;

    return sendGraphqlRequest<GetCitiesResponse>(graphqlQuery);
};

export const fetchPropertyTypes = () => {
    const graphqlQuery = `
        query GetPropertyTypes {
            getPropertyTypes {
                id
                name
            }
        }`;

    return sendGraphqlRequest<GetPropertyTypesResponse>(graphqlQuery);
};

export const login = (email: string, password: string) => {
    const graphqlQuery = `
        mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                success
                errorMessage
                token
            }
        }`;

    const variables = {
        email,
        password
    };

    return sendGraphqlRequest<LoginResult>(graphqlQuery, variables);
};

export const register = (userInput: RegistrationRequest) => {
    const graphqlQuery = `
        mutation Register($userInput: UserInputData!) {
            createUser(userInput: $userInput) {
                success
                errorMessage
            }
        }`;

    const variables = {
        userInput
    };

    return sendGraphqlRequest<RegistrationResult>(graphqlQuery, variables);
};
