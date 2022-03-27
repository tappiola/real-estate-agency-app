import { MAX_BEDROOMS } from '../components/AdvancedSearchForm/AdvancedSearchForm.config';
import { sendGraphqlRequest } from './client';
import {
    GetCitiesResponse,
    GetPropertyTypesResponse,
    GetPropertyResponse,
    LoginResult,
    RegistrationResult,
    RegistrationRequest,
    AddToWishlistResult,
    RemoveFromWishlistResult,
    ClientRequest,
    SaveClientRequestResult,
    GetPropertiesResponse
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

export const getProperty = (id: number) => {
    const graphqlQuery = `
        query GetProperty($id: Int!) {
            getProperty(id: $id) {
                found
                propertyData {
                    id
                    title
                    description
                    address
                    bedroomCount
                    bathroomCount
                    city {
                        id
                        name
                    }
                    propertyType {
                        id
                        name
                    }
                    images {
                        id
                        link
                        position
                    }
                    isInWishlist
                    longitude
                    latitude
                    floorPlan
                    price
                    type {
                        id
                        name
                    }
                }
            }
        }`;

    const variables = {
        id
    };

    return sendGraphqlRequest<GetPropertyResponse>(graphqlQuery, variables);
};

export const searchProperties = (params: any) => {
    const graphqlQuery = `
        query GetProperties($searchParams: PropertySearchParams!) {
            getProperties(searchParams: $searchParams) {
                count
                pages
                items {
                    id
                    title
                    description
                    address
                    bedroomCount
                    bathroomCount
                    city {
                        id
                        name
                    }
                    propertyType {
                        id
                        name
                    }
                    images {
                        id
                        link
                        position
                    }
                    isInWishlist
                    longitude
                    latitude
                    price
                    type {
                        id
                        name
                    }
                }
            }
        }`;

    const {
        adType,
        page,
        city,
        propertyType,
        minPrice,
        maxPrice,
        minBeds,
        maxBeds
    } = params;

    const variables = {
        searchParams: {
            adType,
            page: +page,
            ...(city && { cityId: +city }),
            ...(propertyType && { propertyTypeId: +propertyType }),
            ...(minPrice && { minPrice: +minPrice }),
            ...(maxPrice && { maxPrice: +maxPrice }),
            ...(minBeds && { minBeds: +minBeds }),
            ...(maxBeds && { maxBeds: +maxBeds === MAX_BEDROOMS ? undefined : +maxBeds })
        }
    };

    return sendGraphqlRequest<GetPropertiesResponse>(graphqlQuery, variables);
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

export const addToWishlist = (id: number) => {
    const graphqlQuery = `
        mutation AddToWishlist($id: String!) {
            addToWishlist(propertyId: $id) {
                success
            }
        }`;

    const variables = {
        id
    };

    return sendGraphqlRequest<AddToWishlistResult>(graphqlQuery, variables);
};

export const removeFromWishlist = (id: number) => {
    const graphqlQuery = `
        mutation RemoveFromWishlist($id: String!) {
            removeFromWishlist(propertyId: $id) {
                success
            }
        }`;

    const variables = {
        id
    };

    return sendGraphqlRequest<RemoveFromWishlistResult>(graphqlQuery, variables);
};

export const saveClientRequest = (clientRequest: ClientRequest) => {
    const graphqlQuery = `
        mutation SaveClientRequest($clientRequest: ClientRequestData!) {
            saveClientRequest(clientRequest: $clientRequest) {
                success
                errorMessage
            }
        }`;

    const variables = {
        clientRequest
    };

    return sendGraphqlRequest<SaveClientRequestResult>(graphqlQuery, variables);
};
