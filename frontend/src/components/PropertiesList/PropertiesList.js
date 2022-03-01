  import inView from 'in-view';
  import React, {useEffect, useRef} from "react";
  import './PropertiesList.style.scss';
  import PropertyCardContainer from "../PropertyCard";
  import ContentLoader from "react-content-loader";
  import PropertiesLoader from "../PropertiesLoader/PropertiesLoader.component";

  const PropertiesList = ({properties, activeItem, setActiveItem, isLoading}) => {
    const listRef = useRef();

    const scrollListener = () => {
      // Active list item is top-most fully-visible item
      const visibleListItems = Array.from(
          document.getElementsByClassName('PropertyCard')
      ).map(inView.is);

      // If it's a new one, update active list item
      const topMostVisible = visibleListItems.indexOf(true);
      if (topMostVisible !== activeItem && topMostVisible !== -1) {
        setActiveItem(topMostVisible);
      }
    };

    useEffect(() => inView.offset(200), []);

    // Update list scroll position when active list item is updated via map
    useEffect(() => {
      if (listRef && listRef.current && properties.length) {
        listRef.current.scrollTop = document.getElementById(
            `property-${activeItem}`
        ).offsetTop - 70;
      }}, [listRef, activeItem]);

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