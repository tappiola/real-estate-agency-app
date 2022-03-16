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
