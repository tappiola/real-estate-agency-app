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
    activeItem: number,
    setActiveItem: (id: number) => void,
    searchParams: URLSearchParams
}> = ({count, properties, isLoading, pages, activeItem, setActiveItem, searchParams}) => {
    const renderMap = () => {
        if (!properties.length){
            return null;
        }

        return <MapContainer
            properties={properties}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
        />
    }

    return <>
        <div className="SearchResults-Container">
            <p className='SearchResults-Count'>{count || 'No'} results</p>
            <div className="pane left">
                <PropertiesListContainer
                    isLoading={isLoading}
                    properties={properties}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
                {pages > 1 && <Pagination pages={pages} searchParams={searchParams}/>}
            </div>
            <div className="pane right">
                {renderMap()}
            </div>
        </div>
    </>
}

export default SearchResults;