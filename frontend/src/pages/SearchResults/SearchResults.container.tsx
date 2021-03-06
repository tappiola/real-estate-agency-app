import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchResults from './SearchResults.component';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AdType, ToastTypes } from '../../constants';
import { enqueueToast } from '../../store/notifier';
import { getProperties } from '../../store/search';
import GenericMessage from '../../components/GenericMessage';

const SearchResultsContainer: React.FC<{ adType: AdType }> = ({ adType }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const dispatch = useAppDispatch();

    const { isMobile } = useAppSelector(({ config }) => config);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const {
        activeProperty,
        properties,
        pages,
        count,
        activeSearch
    } = useAppSelector(({ search }) => search);

    const { page } = activeSearch;

    useEffect(() => {
        if (!searchParams.get('city')) {
            dispatch(enqueueToast({
                message: 'City is required',
                type: ToastTypes.Warning
            }));

            setIsLoading(false);
            return;
        }

        const fetchProperties = async () => {
            try {
                await dispatch(getProperties({ adType, searchParams, isMobile }));
            } catch (e) {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, [adType, dispatch, isMobile, searchParams]);

    useEffect(() => {
        if (page > pages) {
            searchParams.delete('page');
            navigate(`?${searchParams.toString()}`);
        }
    }, [searchParams, page, pages, navigate]);

    useEffect(() => {
        if (!isMobile) {
            return;
        }

        if (properties.length && activeProperty + 1 === properties.length && page < pages) {
            const fetchMoreProperties = async () => {
                try {
                    dispatch(getProperties({ adType, searchParams, requestMore: true }));
                } catch (e) {
                    setHasError(true);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchMoreProperties();
        }
    }, [isMobile, activeProperty, properties, count, page, pages, dispatch, adType, searchParams]);

    if (hasError) {
        return <GenericMessage>Fetching properties failed</GenericMessage>;
    }

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
