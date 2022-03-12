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
     
     type Image {
        id: ID!
        link: String!
        position: Int!
     }
     
     type Type {
        id: ID!
        name: String!
     }

    type Property {
        id: ID!
        title: String!
        address: String!
        description: String!
        city: City!
        propertyType: PropertyType!
        images: [Image!]!
        isInWishlist: Boolean
        longitude: Float
        latitude: Float
        price: Int!
        bedroomCount: Int!
        bathroomCount: Int!
        type: Type
        floorPlan: String
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

    type LoginResult {
        success: Boolean!
        token: String
        errorMessage: String
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }
    
    type Properties {
        count: Int!
        pages: Int!
        items: [Property!]!
    }

    type RootQuery {
        getProperties(adType: String!, page: Int!, cityId: Int, propertyTypeId: Int, minPrice: Int, maxPrice: Int, minBeds: String, maxBeds: String): Properties
        getProperty(id: Int!): Property!
        getWishlist: [Property!]!
        getCities: [City!]!
        getPropertyTypes: [PropertyType!]!
    }

    type RootMutation {
        login(email: String!, password: String!): LoginResult!
        createUser(userInput: UserInputData): User!
        addToWishlist(propertyId: String!): Status!
        removeFromWishlist(propertyId: String!): Status!
        saveClientRequest(firstName: String!, lastName: String, email: String, phone: String, message: String): Status!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
