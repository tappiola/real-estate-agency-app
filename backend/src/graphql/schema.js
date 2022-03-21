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
    
    type LocatedProperty {
        found: Boolean!
        propertyData: Property
    }
   
    type Status {
        success: Boolean!
        errorMessage: String
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        password: String
    }

    type LoginResult {
        success: Boolean!
        errorMessage: String
        token: String
    }
    
    type RegistrationResult {
        success: Boolean!
        errorMessage: String
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }
    
    input ClientRequestData {
        firstName: String!
        lastName: String
        email: String!
        phone: String
        message: String!
    }
    
    input PropertySearchParams {
        adType: String!
        page: Int!
        cityId: Int
        propertyTypeId: Int
        minPrice: Int
        maxPrice: Int
        minBeds: Int
        maxBeds: Int
    }
    
    type Properties {
        count: Int!
        pages: Int!
        items: [Property!]!
    }

    type RootQuery {
        getProperties(searchParams: PropertySearchParams!): Properties
        getProperty(id: Int!): LocatedProperty!
        getWishlist: [Property!]!
        getCities: [City!]!
        getPropertyTypes: [PropertyType!]!
    }

    type RootMutation {
        login(email: String!, password: String!): LoginResult!
        createUser(userInput: UserInputData): RegistrationResult!
        addToWishlist(propertyId: String!): Status!
        removeFromWishlist(propertyId: String!): Status!
        saveClientRequest(clientRequest: ClientRequestData!): Status!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
