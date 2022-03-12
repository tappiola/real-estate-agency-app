export type LoginResponse = {
    login: {
        success: boolean
        token: string
        errorMessage: string
    }
};
