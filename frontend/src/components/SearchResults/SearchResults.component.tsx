import React from "react";
import Pagination from "../Pagination";
import {Property} from "../../types";
import './SearchResults.style.scss';
import PropertiesListContainer from "../PropertiesList";
import MapContainer from "../Map";

const SearchResults: React.FC<{
    count: number,
    properties: Property[],
    isLoading: boolean,
    pages: number,
    searchParams: URLSearchParams,
    isMobile: boolean
}> = ({count, properties, isLoading, pages, searchParams, isMobile}) => {
    const renderMap = () => {
        if (!properties.length){
            return null;
        }

        return <MapContainer/>
    }

    const renderPagination = () => {
        if (isMobile || pages <=1 ){
            return null;
        }

        return <Pagination pages={pages} searchParams={searchParams}/>;
    }

    return <>
        <div className="SearchResults-Container">
            <p className='SearchResults-Count'>{count || 'No'} results</p>
            <div className="SearchResults-Pane SearchResults-Properties">
                <PropertiesListContainer
                    isLoading={isLoading}
                />
                {renderPagination()}
            </div>
            <div className="SearchResults-Pane SearchResults-Map">
                {renderMap()}
            </div>
        </div>
    </>
}

export default SearchResults;