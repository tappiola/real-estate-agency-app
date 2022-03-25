import React from 'react';
import Pagination from '../../components/Pagination';
import { Property } from '../../types';
import './SearchResults.style.scss';
import PropertiesListContainer from '../../components/PropertiesList';
import Map from '../../components/DynamicMap';
import { PlaceholderBlock } from '../../components/Placeholder';

const SearchResults: React.FC<{
    count: number,
    properties: Property[],
    isLoading: boolean,
    pages: number,
    searchParams: URLSearchParams,
    isMobile: boolean
}> = ({
    count,
    properties,
    isLoading,
    pages,
    searchParams,
    isMobile
}) => {
    const renderMap = () => {
        if (isLoading) {
            return <PlaceholderBlock />;
        }

        if (!properties.length) {
            return null;
        }

        return <Map />;
    };

    const renderPagination = () => {
        if (isMobile || pages <= 1) {
            return null;
        }

        return <Pagination pages={pages} searchParams={searchParams} />;
    };

    return (
      <div className="SearchResults-Container">
        <p className="SearchResults-Count">
          {`${count || 'No'} results`}
        </p>
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
    );
};

export default SearchResults;
