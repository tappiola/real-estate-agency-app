import {sendGraphqlRequest} from "./graphql";

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

export const searchProperties = (page) => {
    const graphqlQuery = {
        query:`
            {
              getProperties(page: ${page}) {
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
                    city { id name }
                    propertyType { id name }
                    isInWishlist
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