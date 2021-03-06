// @ts-ignore
import inView from 'in-view';
import React, { useCallback, useEffect, useRef } from 'react';
import './PropertiesList.style.scss';
import PropertiesLoader from '../PropertiesLoader';
import PropertiesList from './PropertiesList.component';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setActiveProperty } from '../../store/search';

const PropertiesListContainer: React.FC<{
    isLoading: boolean
}> = ({ isLoading }) => {
    const listRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const { activeProperty, properties } = useAppSelector(({ search }) => search);
    const { isMobile } = useAppSelector(({ config }) => config);

    const getTopVisible = useCallback(() => {
    // Active list item is top-most fully-visible item
        const visibleListItems = Array.from(
            document.getElementsByClassName('PropertyCard')
        ).map(inView.is);

        // If it's a new one, update active list item
        return visibleListItems.indexOf(true);
    }, []);

    const scrollListener = useCallback(() => {
        const topMostVisible = getTopVisible();

        if (topMostVisible !== activeProperty && topMostVisible !== -1) {
            dispatch(setActiveProperty(topMostVisible));
        }
    }, [activeProperty, dispatch, getTopVisible]);

    const changeListener = useCallback((index: number) => {
        dispatch(setActiveProperty(index));
    }, [dispatch]);

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
    }, [listRef, activeProperty, properties, getTopVisible]);

    if (isLoading) {
        return <PropertiesLoader isMobile={isMobile} />;
    }

    if (!properties.length) {
        return null;
    }

    return (
      <PropertiesList
        properties={properties}
        listRef={listRef}
        scrollListener={scrollListener}
        changeListener={changeListener}
        isMobile={isMobile}
        activeProperty={activeProperty}
      />
    );
};

export default React.memo(PropertiesListContainer);
