import {sendGraphqlRequest} from "./graphql";
import {MAX_BEDROOMS} from "./components/AdvancedSearchForm/AdvancedSearchForm.config";
import {AdType} from "./constants";

export const addToWishlist = (id: number) => {
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

export const removeFromWishlist = (id: number) => {
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

export const login = (email: string, password: string) => {
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

export const register = (email: string, name: string, password: string) => {
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

export const searchProperties = (adType: AdType, searchParams: URLSearchParams, virtualPage: number = 1) => {
    let params: any = {};

    for(const [key, value] of searchParams.entries()) {
        params = ({...params, [key]: value});
    }

    const {page = virtualPage, city, propertyType, minPrice, maxPrice, minBeds, maxBeds} = params;

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

export const searchPropertiesQuery = (params: any) => {

    const {adType, page, city, propertyType, minPrice, maxPrice, minBeds, maxBeds} = params;

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

export const getProperty = (id: number) => {
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

type SaveClientRequest = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
}

export const saveClientRequest = ({firstName, lastName, email, phoneNumber}: SaveClientRequest) => {
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