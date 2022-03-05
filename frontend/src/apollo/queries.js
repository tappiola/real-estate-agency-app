import { gql } from "@apollo/client";

export const GET_WISHLIST = gql`
{
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