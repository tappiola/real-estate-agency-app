import React from "react";
import Loader from "../Loader";
import Pagination from "../Pagination";
import {PropertyType} from "../../types";
import './SearchResults.style.scss';
import PropertiesList from "../PropertiesList/PropertiesList";
import {listItems} from "../Map/consts";
import Map from "../Map/Map";

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

    if(isLoading){
        return <Loader/>
    }

    return <>

        <div className="container">
            <div className="pane left">
                <h2>Search results</h2>
                <h6>{count || 'No'} items found</h6>
                <PropertiesList properties={properties} activeItem={activeItem} setActiveItem={setActiveItem}/>
                {pages > 1 && <Pagination pages={pages} currentPage={currentPage}/>}
            </div>
            <div className="pane right">
                <Map properties={properties} activeItem={activeItem} setActiveItem={setActiveItem}/>
            </div>
        </div>
    </>
}

export default SearchResults;