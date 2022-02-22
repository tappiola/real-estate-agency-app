import React from "react";
import PropertyCard from "../PropertyCard";
import Loader from "../Loader";
import Pagination from "../Pagination";
import {PropertyType} from "../../types";
import './SearchResults.style.scss';

const SearchResults: React.FC<{
    count: number,
    properties: PropertyType[],
    isLoading: boolean,
    pages: number,
    currentPage: number,
    activeItem: number,
    setActiveItem: (id: number) => void
}> = (
        {count,
            properties,
            isLoading,
            pages,
            currentPage,
            activeItem,
            setActiveItem}) => {

    return <>
        <h1>Search results</h1>
        <h6>{count || 'No'} items found</h6>
        {properties.map(property => <PropertyCard key={property.id} property = {property}/>)}
        {isLoading && <Loader/>}
        {pages > 1 && <Pagination pages={pages} currentPage={currentPage}/>}
    </>
}

export default SearchResults;