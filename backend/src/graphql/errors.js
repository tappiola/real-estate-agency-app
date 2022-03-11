const { GraphQLError } = require('graphql');

class NotAuthenticatedError extends GraphQLError {
    constructor() {
        super('User is not authenticated');
        this.extensions.code = 'NOT_AUTHENTICATED';
    }
}

class UserAlreadyExistsError extends GraphQLError {
    constructor() {
        super('User already exists');
        this.extensions.code = 'USER_ALREADY_EXISTS';
    }
}

module.exports = {
    NotAuthenticatedError,
    UserAlreadyExistsError,
};
