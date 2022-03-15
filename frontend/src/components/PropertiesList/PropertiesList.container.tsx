// @ts-ignore
import inView from 'in-view';
import React, { useEffect, useRef } from 'react';
import './PropertiesList.style.scss';
import PropertiesLoader from '../PropertiesLoader/PropertiesLoader.component';
import PropertiesList from './PropertiesList.component';
import useIsMobile from '../IsMobile';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setActiveProperty } from '../../redux/search';

const PropertiesListContainer: React.FC<{
    isLoading: boolean }
> = ({ isLoading }) => {
    const listRef = useRef<HTMLDivElement>(null);

    const isMobile = useIsMobile();
    const dispatch = useAppDispatch();
    const { activeProperty, properties, activeSearch } = useAppSelector(({ search }) => search);
    const { page, ...otherParams } = activeSearch;

    const getTopVisible = () => {
    // Active list item is top-most fully-visible item
        const visibleListItems = Array.from(
            document.getElementsByClassName('PropertyCard')
        ).map(inView.is);

        // If it's a new one, update active list item
        return visibleListItems.indexOf(true);
    };

    const scrollListener = () => {
        const topMostVisible = getTopVisible();

        if (topMostVisible !== activeProperty && topMostVisible !== -1) {
            dispatch(setActiveProperty(topMostVisible));
        }
    };

    const changeListener = (index: number) => {
        dispatch(setActiveProperty(index));
    };

    useEffect(() => inView.offset(200), []);

    // Update list scroll position when active list item is updated via map
    useEffect(() => {
        setTimeout(() => {
            if (listRef && listRef.current && properties.length) {
                const topMostVisible = getTopVisible();

                if (topMostVisible !== activeProperty) {
                    listRef.current.scrollTop = document.getElementById(
                        `property-${activeProperty}`
                    )!.offsetTop - 70;
                }
            }
        }, 0);
    }, [listRef, activeProperty, properties]);

    if (isLoading) {
        return <PropertiesLoader />;
    }

    return (
      <PropertiesList
        properties={properties}
        isLoading={isLoading}
        listRef={listRef}
        scrollListener={scrollListener}
        changeListener={changeListener}
        isMobile={isMobile}
        activeProperty={activeProperty}
        searchKey={JSON.stringify(otherParams)}
      />
    );
};

export default React.memo(PropertiesListContainer);
