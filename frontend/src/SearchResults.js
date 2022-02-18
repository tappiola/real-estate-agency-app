import {useEffect, useState} from "react";
import PropertyCard from "./PropertyCard";
import {searchProperties} from "./queries";
import Loader from "./Loader";

const SearchResults = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await searchProperties();
                const {data: {getProperties}} = await response.json();
                setProperties(getProperties);
                setIsLoading(false);
            } catch (e){
                console.log(e);
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, []);

    return <>
        <h1>Search results</h1>
        {properties.map(p => <PropertyCard key={p.id} property = {p}/>)}
        {isLoading && <Loader/>}
    </>
}

export default SearchResults;