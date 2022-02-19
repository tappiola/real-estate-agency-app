import {useEffect, useState} from "react";
import PropertyCard from "./PropertyCard";
import {searchProperties} from "./queries";
import Loader from "./Loader";
import Pagination from "./Pagination";
import {useSearchParams} from "react-router-dom";

const SearchResults = () => {
    const [properties, setProperties] = useState([]);
    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const currentPage = +searchParams.get('page') || 1;
    console.log({currentPage});

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await searchProperties(currentPage);
                const {data: {getProperties: {items, pages, count}}} = await response.json();
                setProperties(items);
                setPages(pages);
                setCount(count);
                setIsLoading(false);
            } catch (e){
                console.log(e);
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, [currentPage]);

    return <>
        <h1>Search results</h1>
        <h6>{count || 'No'} items found</h6>
        {properties.map(property => <PropertyCard key={property.id} property = {property}/>)}
        {isLoading && <Loader/>}
        {pages > 1 && <Pagination pages={pages} currentPage={currentPage}/>}
    </>
}

export default SearchResults;