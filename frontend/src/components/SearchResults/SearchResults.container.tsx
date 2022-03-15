import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchResults from './SearchResults.component';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AdType, ToastTypes } from '../../constants';
import { enqueueToast } from '../../redux/notifier';
import useIsMobile from '../IsMobile';
import { getProperties } from '../../redux/search';

const SearchResultsContainer: React.FC<{ adType: AdType }> = ({ adType }) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();

    const isMobile = useIsMobile();

    const [searchParams] = useSearchParams();

    const {
        activeProperty, properties, pages, count, activeSearch
    } = useAppSelector(({ search }) => search);

    const { page } = activeSearch;

    useEffect(() => {
        if (!searchParams.get('city')) {
            dispatch(enqueueToast({
                message: 'City is required 2',
                type: ToastTypes.Warning
            }));
            setIsLoading(false);
            return;
        }

        const fetchProperties = async () => {
            try {
                await dispatch(getProperties({ adType, searchParams }));
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
            }
        };

        fetchProperties();
        setIsLoading(false);
    }, [adType, dispatch, searchParams]);

    useEffect(() => {
        if (!isMobile) {
            return;
        }

        if (properties.length && activeProperty + 1 === properties.length && page < pages) {
            const fetchMoreProperties = async () => {
                try {
                    dispatch(getProperties({ adType, searchParams, requestMore: true }));
                    setIsLoading(false);
                } catch (e) {
                    setIsLoading(false);
                }
            };

            fetchMoreProperties();
        }
    }, [isMobile, activeProperty, properties, count, page, pages, dispatch, adType, searchParams]);

    return (
      <SearchResults
        count={count}
        isLoading={isLoading}
        pages={pages}
        properties={properties}
        searchParams={searchParams}
        isMobile={isMobile}
      />
    );
};

export default SearchResultsContainer;
