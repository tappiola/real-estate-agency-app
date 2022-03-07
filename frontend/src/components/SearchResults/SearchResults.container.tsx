import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import SearchResults from "./SearchResults.component";
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {AdType, ToastTypes} from "../../constants";
import {enqueueToast} from "../../redux/notifier";
import {useIsMobile} from "../IsMobile";
import {getProperties} from "../../redux/search";

const SearchResultsContainer: React.FC<{adType: AdType}> = ({adType}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [virtualPage, setVirtualPage] = useState(1);
    const dispatch = useAppDispatch();

    const isMobile = useIsMobile();

    const [searchParams] = useSearchParams();

    const {activeProperty, properties, pages, count} = useAppSelector(({ search }) => search);

    useEffect(() => {

        if (!searchParams.get('city')){
            dispatch(enqueueToast({
                message: 'City is required 2',
                type: ToastTypes.Warning,
            }));
            setIsLoading(false);
            return;
        }

        const fetchProperties = async () => {
            try {
                await dispatch(getProperties({adType, searchParams, isMobile}));
                setIsLoading(false);
            } catch (e){
                console.log(e);
                setIsLoading(false);
            }
        };

        fetchProperties();
        setIsLoading(false);

    }, [adType, searchParams]);

    useEffect(() => {
        if (!isMobile){
            return;
        }

        if (properties.length && activeProperty + 1 === properties.length && virtualPage < pages){
            const fetchMoreProperties = async () => {
                try {
                    const pageToFetch = virtualPage + 1;
                    dispatch(getProperties({adType, searchParams, virtualPage: pageToFetch, isMobile}));
                    setIsLoading(false);
                    setVirtualPage(pageToFetch);
                } catch (e){
                    console.log(e);
                    setIsLoading(false);
                }
            };

            fetchMoreProperties();
        }
    }, [isMobile, activeProperty, properties, count]);

    return <SearchResults
        count={count}
        isLoading={isLoading}
        pages={pages}
        properties={properties}
        searchParams={searchParams}
        isMobile={isMobile}
    />
}

export default SearchResultsContainer;