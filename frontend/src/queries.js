import {sendGraphqlRequest} from "./graphql";
import {MAX_BEDROOMS} from "./components/AdvancedSearchForm/AdvancedSearchForm.config";

export const addToWishlist = (id) => {
    const graphqlQuery  = {
        query: `
        mutation {
          addToWishlist(propertyId: "${id}") {
            success
          }
        }
      `
    };

    return sendGraphqlRequest(graphqlQuery);
}

export const removeFromWishlist = (id) => {
    const graphqlQuery  = {
        query: `
        mutation {
          removeFromWishlist(propertyId: "${id}") {
            success
          }
        }
      `
    };

    return sendGraphqlRequest(graphqlQuery);
}

export const login = (email, password) => {
    const graphqlQuery = {
        query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
          }
        }
      `
    };

    return sendGraphqlRequest(graphqlQuery);
}

export const register = (email, name, password) => {
    const graphqlQuery = {
        query: `
        mutation {
          createUser(userInput: {email: "${email}", name:"${name}", password:"${password}"}) {
            id
            email
          }
        }
      `
    };

    return sendGraphqlRequest(graphqlQuery);
}

export const searchProperties = (adType, searchParams) => {
    let params = {};

    for(const [key, value] of searchParams.entries()) {
        params = ({...params, [key]: value});
    }

    const {page = 1, city, propertyType, minPrice, maxPrice, minBeds, maxBeds} = params;

    const cityPart = city ? `, cityId: ${+city}` : '';
    const propertyTypePart = propertyType ?`, propertyTypeId: ${+propertyType}` : '';
    const minPricePart = minPrice ? `, minPrice: ${+minPrice}` : '';
    const maxPricePart = maxPrice ? `, maxPrice: ${+maxPrice}` : '';
    const minBedsPart = minBeds ? `, minBeds: "${minBeds}"` : '';
    const maxBedsPart = maxBeds ? `, maxBeds: "${+maxBeds === MAX_BEDROOMS ? `${maxBeds}+` : maxBeds}"` : '';

    const graphqlQuery = {
        query:`
            {
              getProperties(adType: "${adType}", page: ${+page}${cityPart}${propertyTypePart}${minPricePart}${maxPricePart}${minBedsPart}${maxBedsPart}) {
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
            }`};

    return sendGraphqlRequest(graphqlQuery);
}

export const getProperty = (id) => {
    const graphqlQuery = {
        query:`
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
            }`};

    return sendGraphqlRequest(graphqlQuery);
}

export const getWishlist = () => {
    const graphqlQuery = {
        query:`
            {
              getWishlist {
                id
                title
                description
                city { id name }
                propertyType { id name }
              }
            }`};

    return sendGraphqlRequest(graphqlQuery);
}

export const saveClientRequest = ({firstName, lastName, email, phoneNumber}) => {
    const graphqlQuery = {
        query: `
             mutation {
              saveClientRequest(firstName: "${firstName}", lastName: "${lastName}", email: "${email}", phone: "${phoneNumber}")
                {
                    success
              }
            }
            `};

    return sendGraphqlRequest(graphqlQuery);
}

export const fetchCities = () => {
    const graphqlQuery = {
        query:`
            {
              getCities {
                id
                name
              }
            }`};

    return sendGraphqlRequest(graphqlQuery);
}

export const fetchPropertyTypes = () => {
    const graphqlQuery = {
        query:`
            {
              getPropertyTypes {
                id
                name
              }
            }`};

    return sendGraphqlRequest(graphqlQuery);
}