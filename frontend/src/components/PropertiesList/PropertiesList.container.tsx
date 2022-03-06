  // @ts-ignore
  import inView from 'in-view';
  import React, {useEffect, useRef} from "react";
  import './PropertiesList.style.scss';
  import PropertiesLoader from "../PropertiesLoader/PropertiesLoader.component";
  import PropertiesList from "./PropertiesList.component";
  import {Property} from "../../types";

  const PropertiesListContainer: React.FC<{
    properties: Property[], activeItem: number, setActiveItem: (index: number) => void, isLoading: boolean
  }> = ({properties, activeItem, setActiveItem, isLoading}) => {
    const listRef = useRef<HTMLDivElement>(null);

    const scrollListener = () => {
      // Active list item is top-most fully-visible item
      const visibleListItems = Array.from(
          document.getElementsByClassName('PropertyCard')
      ).map(inView.is);

      // If it's a new one, update active list item
      const topMostVisible = visibleListItems.indexOf(true);
      if (topMostVisible !== activeItem && topMostVisible !== -1) {
        console.log('setActiveItem', topMostVisible);
        setActiveItem(topMostVisible);
      }
    };

    useEffect(() => inView.offset(200), []);

    // Update list scroll position when active list item is updated via map
    useEffect(() => {
      if (listRef && listRef.current && properties.length) {
        listRef.current.scrollTop = document.getElementById(
            `property-${activeItem}`
        )!.offsetTop - 70;
      }}, [listRef, activeItem]);

    if(isLoading){
      return <PropertiesLoader/>
    }

    return <PropertiesList
        properties={properties}
        isLoading={isLoading}
        listRef={listRef}
        scrollListener={scrollListener}
        />
  }

  export default PropertiesListContainer;