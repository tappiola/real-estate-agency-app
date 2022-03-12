export type LoginResult = {
    login: {
        success: boolean
        errorMessage: string
        token: string
    }
};

export type RegistrationResult = {
    createUser: {
        success: boolean
        errorMessage: string
    }
};
