import React, {useEffect, useState} from "react";
import {searchProperties} from "../../queries";
import {useSearchParams} from "react-router-dom";
import SearchResults from "./SearchResults.component";
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {AdType, ToastTypes} from "../../constants";
import {enqueueToast} from "../../redux/notifier";
import {useIsMobile} from "../IsMobile";
import {Property} from "../../types";

const SearchResultsContainer: React.FC<{adType: AdType}> = ({adType}) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [virtualPage, setVirtualPage] = useState(1);
    const dispatch = useAppDispatch();

    const isMobile = useIsMobile();

    const [searchParams] = useSearchParams();

    const {scrollOffset} = useAppSelector(({ navigation }) => navigation);
    const {activeProperty} = useAppSelector(({ navigation }) => navigation);

        useEffect(() => {
            if (scrollOffset){
                setTimeout(() => window.scrollTo({top: scrollOffset, behavior: 'smooth'}), 100);
            }
        }
        ,[]);

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
                const response = await searchProperties(adType, searchParams);
                const {data: {getProperties: {items, pages, count}}} = await response.json();
                setProperties(items);
                setPages(pages);
                setCount(count);
                setIsLoading(false);
            } catch (e){
                console.log(e);
                setIsLoading(false);
            }
        };

        fetchProperties();

    }, [adType, searchParams]);

    useEffect(() => {
        if (!isMobile){
            return;
        }

        if (properties.length && activeProperty + 1 === properties.length && virtualPage < pages){
            const fetchMoreProperties = async () => {
                try {
                    const pageToFetch = virtualPage + 1;
                    const response = await searchProperties(adType, searchParams, pageToFetch);
                    const {data: {getProperties: {items, pages, count}}} = await response.json();
                    setProperties([...properties, ...items]);
                    setPages(pages);
                    setCount(count);
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

    // useEffect(() => {dispatch(setActiveProperty(0))}, [searchParams]);

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