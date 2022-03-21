import { Property } from '../types';

export type JwtDecodeResult = {
    exp: number,
};

export type GraphqlResponse<T> = {
    data?: T
    errors?: Array<{ message: string }>
};

export type GetCitiesResponse = {
    getCities: [{
        id: number
        name: string
    }]
};

export type GetPropertyTypesResponse = {
    getPropertyTypes: [{
        id: number
        name: string
    }]
};

export type GetPropertyResponse = {
    getProperty: {
        found: boolean
        propertyData: Property
    }
};

export type GetPropertiesResponse = {
    getProperties: {
        count: number
        pages: number
        items: [Property]
    }
};

export type LoginResult = {
    login: {
        success: boolean
        errorMessage: string
        token: string
    }
};

export type RegistrationRequest = {
    email: string
    name: string
    password: string
};

export type RegistrationResult = {
    createUser: {
        success: boolean
        errorMessage: string
    }
};

export type AddToWishlistResult = {
    addToWishlist: {
        success: boolean
    }
};

export type RemoveFromWishlistResult = {
    removeFromWishlist: {
        success: boolean
    }
};

export type ClientRequest = {
    firstName: string
    lastName: string
    email: string
    phone: string
    message: string
};

export type SaveClientRequestResult = {
    saveClientRequest: {
        success: boolean
        errorMessage: string
    }
};
