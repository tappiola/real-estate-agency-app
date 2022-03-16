import { sendGraphqlRequest } from './graphql';
import { MAX_BEDROOMS } from './components/AdvancedSearchForm/AdvancedSearchForm.config';
import { SaveClientRequest } from './types';

export const addToWishlist = (id: number) => {
    const graphqlQuery = {
        query: `
        mutation {
          addToWishlist(propertyId: "${id}") {
            success
          }
        }
      `
    };

    return sendGraphqlRequest(graphqlQuery);
};

export const removeFromWishlist = (id: number) => {
    const graphqlQuery = {
        query: `
        mutation {
          removeFromWishlist(propertyId: "${id}") {
            success
          }
        }
      `
    };

    return sendGraphqlRequest(graphqlQuery);
};

export const searchProperties = (params: any) => {
    const {
        adType, page, city, propertyType, minPrice, maxPrice, minBeds, maxBeds
    } = params;

    const cityPart = city ? `, cityId: ${+city}` : '';
    const propertyTypePart = propertyType ? `, propertyTypeId: ${+propertyType}` : '';
    const minPricePart = minPrice ? `, minPrice: ${+minPrice}` : '';
    const maxPricePart = maxPrice ? `, maxPrice: ${+maxPrice}` : '';
    const minBedsPart = minBeds ? `, minBeds: "${minBeds}"` : '';
    const maxBedsPart = maxBeds ? `, maxBeds: "${+maxBeds === MAX_BEDROOMS ? `${maxBeds}+` : maxBeds}"` : '';

    const graphqlQuery = {
        query: `
            {
              getProperties(adType: "${adType}", page: ${+page}${cityPart}${propertyTypePart}${minPricePart}
              ${maxPricePart}${minBedsPart}${maxBedsPart}) {
                count
                pages
                items {
                    id
                    title
                    description
                    address
                    bedroomCount
                    bathroomCount
                    city { id name }
                    propertyType { id name }
                    images { id link position }
                    isInWishlist
                    longitude
                    latitude
                    price
                    type {id name}
                }
              }
            }`
    };

    return sendGraphqlRequest(graphqlQuery);
};

export const getProperty = (id: number) => {
    const graphqlQuery = {
        query: `
            {
              getProperty(id: ${id})
                {
                    id
                    title
                    description
                    address
                    bedroomCount
                    bathroomCount
                    city { id name }
                    propertyType { id name }
                    images { id link position }
                    isInWishlist
                    longitude
                    latitude
                    floorPlan
                    price
                    type {id name}
              }
            }`
    };

    return sendGraphqlRequest(graphqlQuery);
};

export const saveClientRequest = ({
    firstName, lastName, email, phoneNumber, message
}: SaveClientRequest) => {
    const graphqlQuery = {
        query: `
             mutation {
              saveClientRequest(
              firstName: "${firstName}", lastName: "${lastName}", email: "${email}", phone: "${phoneNumber}",
              message: "${message}")
                {
                    success
              }
            }
            `
    };

    return sendGraphqlRequest(graphqlQuery);
};
