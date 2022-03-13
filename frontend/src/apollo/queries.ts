import { gql } from '@apollo/client';

export const GET_CITIES = gql`
query GetCities {
    getCities {
        id
        name
    }
}
`;

export const GET_PROPERTY_TYPES = gql`
query GetPropertyTypes {
    getPropertyTypes {
        id
        name
    }
}
`;

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        success
        errorMessage
        token
    }
}
`;

export const REGISTER = gql`
mutation Register($userInput: UserInputData!) {
    createUser(userInput: $userInput) {
        success
        errorMessage
    }
}
`;

export const GET_WISHLIST = gql`
query GetWishlist {
    getWishlist {
        id
        title
        description
        city { id name }
        propertyType { id name }
    }
}
`;

export const REMOVE_WISHLIST_ITEM = gql`
mutation RemoveFromWishlist($propertyId: String!) {
    removeFromWishlist(propertyId: $propertyId) {
        success
    }
}
`;
