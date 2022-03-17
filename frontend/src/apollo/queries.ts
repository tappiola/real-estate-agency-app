import { gql } from '@apollo/client';

export const GET_WISHLIST = gql`
query GetWishlist {
    getWishlist {
        id
        title
        description
        city { id name }
        propertyType { id name }
        type { id name }
        bedroomCount
        images {id link}
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
