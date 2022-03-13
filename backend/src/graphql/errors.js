const { GraphQLError } = require('graphql');

class NotAuthenticatedError extends GraphQLError {
    constructor() {
        super('User is not authenticated');
        this.extensions.code = 'NOT_AUTHENTICATED';
    }
}

module.exports = {
    NotAuthenticatedError,
};
