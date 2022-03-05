import React, {useEffect, useState} from "react";
import {searchProperties} from "../../queries";
import {useSearchParams} from "react-router-dom";
import SearchResults from "./SearchResults.component";
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {AdType, ToastTypes} from "../../constants";
import {enqueueToast} from "../../redux/Notifier";

const SearchResultsContainer: React.FC<{adType: AdType}> = ({adType}) => {
    const [properties, setProperties] = useState([]);
    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [activeItem, setActiveItem] = useState(0);

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const {scrollOffset} = useAppSelector(({ navigation }) => navigation);

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

    useEffect(() => setActiveItem(0), [searchParams]);

    return <SearchResults
        count={count}
        isLoading={isLoading}
        pages={pages}
        properties={properties}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        searchParams={searchParams}
    />
}

export default SearchResultsContainer;