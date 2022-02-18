import {useEffect, useState} from "react";
import WishlistIconComponent from "./WishlistIcon";
import WishlistIcon from "./WishlistIcon";
import PropertyCard from "./PropertyCard";
import {sendGraphqlRequest} from "./graphql";

const SearchResults = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const graphqlQuery = {
                query:`
            {
              getProperties {
                id
                title
                description
                city { id name }
                propertyType { id name }
                isInWishlist
              }
            }`}

            try {
                const response = await sendGraphqlRequest(graphqlQuery);
                const {data: {getProperties}} = await response.json();
                console.log(getProperties);
                setProperties(getProperties);
            } catch (e){
                console.log(e);
            }
        };

        fetchProperties();
    }, []);

    return <>
        <h1>Search results</h1>
        {properties.map(p => <PropertyCard key={p.id} property = {p}/>)}
    </>
}

export default SearchResults;