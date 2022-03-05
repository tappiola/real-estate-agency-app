  import React from "react";
  import './PropertiesList.style.scss';
  import PropertyCardContainer from "../PropertyCard";
  import PropertiesLoader from "../PropertiesLoader/PropertiesLoader.component";

  const PropertiesList = ({properties, isLoading, listRef, scrollListener}) => {
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