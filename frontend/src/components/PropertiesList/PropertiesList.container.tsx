  // @ts-ignore
  import inView from 'in-view';
  import React, {useEffect, useRef} from "react";
  import './PropertiesList.style.scss';
  import PropertiesLoader from "../PropertiesLoader/PropertiesLoader.component";
  import PropertiesList from "./PropertiesList.component";
  import {Property} from "../../types";
  import {useIsMobile} from "../IsMobile";
  import {useAppDispatch, useAppSelector} from "../../redux/hooks";
  import {setActiveProperty} from "../../redux/navigation";

  const PropertiesListContainer: React.FC<{
    properties: Property[],
    isLoading: boolean}
  > = ({properties, isLoading}) => {
    const listRef = useRef<HTMLDivElement>(null);

    const isMobile = useIsMobile();
    const dispatch = useAppDispatch();
    const {activeProperty} = useAppSelector(({ navigation }) => navigation);

    const scrollListener = () => {
      // Active list item is top-most fully-visible item
      const visibleListItems = Array.from(
          document.getElementsByClassName('PropertyCard')
      ).map(inView.is);

      // If it's a new one, update active list item
      const topMostVisible = visibleListItems.indexOf(true);
      if (topMostVisible !== activeProperty && topMostVisible !== -1) {
        // setActiveItem(topMostVisible);
        dispatch(setActiveProperty(topMostVisible));
      }
    };

    const changeListener = (index: number) => {
      // setActiveItem(index);
      dispatch(setActiveProperty(index));
    }

    useEffect(() => inView.offset(200), []);

    // Update list scroll position when active list item is updated via map
    useEffect(() => {
      if (listRef && listRef.current && properties.length) {
        listRef.current.scrollTop = document.getElementById(
            `property-${activeProperty}`
        )!.offsetTop - 70;
      }}, [listRef, activeProperty, properties]);

    if(isLoading){
      return <PropertiesLoader/>
    }

    return <PropertiesList
        properties={properties}
        isLoading={isLoading}
        listRef={listRef}
        scrollListener={scrollListener}
        changeListener={changeListener}
        isMobile={isMobile}
        activeProperty={activeProperty}
        />
  }

  export default PropertiesListContainer;