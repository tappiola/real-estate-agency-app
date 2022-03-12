import { gql } from '@apollo/client';

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

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        success
        token
        errorMessage
    }
}
`;
