const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type City {
        id: ID!
        name: String!
     }
     
     type PropertyType {
        id: ID!
        name: String!
     }

    type Property {
        id: ID!
        title: String!
        description: String!
        city: City
        propertyType: PropertyType,
        isInWishlist: Boolean
    }
   
    
    type Status {
        success: Boolean!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        password: String
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }
    
    type Properties {
        count: Int!
        items: [Property!]!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getProperties: Properties
        getWishlist: [Property!]!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        addToWishlist(propertyId: String!): Status!
        removeFromWishlist(propertyId: String!): Status!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
