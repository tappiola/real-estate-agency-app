  import React, {RefObject} from "react";
  import './PropertiesList.style.scss';
  import PropertyCardContainer from "../PropertyCard";
  import PropertiesLoader from "../PropertiesLoader/PropertiesLoader.component";
  import {Property} from "../../types";

  const PropertiesList: React.FC<{properties: Property[], isLoading: boolean, listRef: RefObject<HTMLDivElement>, scrollListener: () => void}>
      = ({properties, isLoading, listRef, scrollListener}) => {
    if(isLoading){
      return <PropertiesLoader/>
    }

    return <div className='Properties-List' ref={listRef} onScroll={scrollListener}>
      { properties.map((property, index) => <PropertyCardContainer
          key={index}
          property={property}
          index={index}
      />)}
        </div>
  }

  export default PropertiesList;